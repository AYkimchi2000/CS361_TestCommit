import webview
import uvicorn
import threading
import socket
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# --- FastAPI Setup ---
app = FastAPI()
current_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(current_dir, "build")

@app.get("/api/status")
def get_status():
    return {"status": "Backend is running!"}

# Serve the SvelteKit static files
app.mount("/_app", StaticFiles(directory=os.path.join(build_dir, "_app")), name="static")

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    return FileResponse(os.path.join(build_dir, "index.html"))

# --- helper to find an open port ---
def get_free_port():
    with socket.socket() as s:
        s.bind(('', 0))
        return s.getsockname()[1]

# --- pywebview Setup ---
def run_server(port):
    uvicorn.run(app, host="127.0.0.1", port=port, log_level="error")

if __name__ == "__main__":
    port = get_free_port()
    url = f"http://127.0.0.1:{port}"

    # Start FastAPI in a background thread
    server_thread = threading.Thread(target=run_server, args=(port,), daemon=True)
    server_thread.start()

    # Launch the native window
    webview.create_window("SvelteKit + FastAPI Desktop App", url)
    webview.start()