import argparse
import webview
import uvicorn
import threading
import socket
import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from cors import setup_cors
from typing import List
from pydantic import BaseModel
import utils

app = FastAPI()
setup_cors(app, True)

class ChordData(BaseModel):
    chords: List[List[str]]
    tuning: List[str]
    fretCount: int


def get_path(relative_path):
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)

current_dir = os.path.dirname(os.path.abspath(__file__))
frontend_build = get_path("frontBuild")

@app.get("/api/status")
def get_status():
    return {"status": "Backend is running!"}

@app.post("/api/calcBestFret")
def calcBestFret(data: ChordData):
    bestFrets = utils.calc_best_frets(utils.array_unique(utils.clean_octave(data.chords)), utils.fretboard)
    return {
        "recevied chordData:": data,
        "bestFret:": bestFrets
    }

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(os.path.join(frontend_build, "favicon.ico"))

app.mount("/_app", StaticFiles(directory=os.path.join(frontend_build, "_app")), name="static")

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    return FileResponse(os.path.join(frontend_build, "index.html"))


def get_free_port():
    with socket.socket() as s:
        s.bind(('', 0))
        return s.getsockname()[1]

def run_server(port):
    uvicorn.run(app, host="127.0.0.1", port=port, log_level="info")

if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("mode", nargs="?", default="app", choices=["dev", "app"], help="mode to run in")
    args = parser.parse_args()

    match args.mode:
        case "dev": 
            print("Running in DEV mode (Backend only on port 8000)")
            run_server(8000)
        case "app": 
            port = get_free_port()
            url = f"http://127.0.0.1:{port}"

            server_thread = threading.Thread(target=run_server, args=(port,), daemon=True)
            server_thread.start()
            webview.create_window("ChordPositionFinder", url)
            webview.start(debug=True)

