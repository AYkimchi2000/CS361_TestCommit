import argparse
import webview
import uvicorn
import threading
import socket
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import sys
from fastapi.middleware.cors import CORSMiddleware


# --- FastAPI Setup ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In dev, allow the frontend origin (e.g., http://localhost:5173)
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_path(relative_path):
    # PyInstaller creates a temp folder and stores path in _MEIPASS
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)

current_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = get_path("build")

@app.get("/api/status")
def get_status():
    return {"status": "Backend is running!"}

# [4]
app.mount("/_app", StaticFiles(directory=os.path.join(build_dir, "_app")), name="static")
# [/4]

# [3]
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    return FileResponse(os.path.join(build_dir, "index.html"))
# [/3]

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

    

    # [1]
    match args.mode:
        case "dev": 
            print("Running in DEV mode (Backend only on port 8000)")
            run_server(8000)
        case "app": 
            port = get_free_port()
            # [2]
            url = f"http://127.0.0.1:{port}"
            # [/2]

            server_thread = threading.Thread(target=run_server, args=(port,), daemon=True)
            server_thread.start()
            webview.create_window("SvelteKit + FastAPI Desktop App", url)
            webview.start()
    # [/1]
    # Launch the native window
