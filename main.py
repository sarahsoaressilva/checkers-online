from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.requests import Request
from typing import List, Dict
from pydantic import BaseModel

app = FastAPI()


app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/img", StaticFiles(directory="img"), name="img")
app.mount("/templates", StaticFiles(directory="templates"), name="templates")


templates = Jinja2Templates(directory="templates")


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict() = {}
    
    async def connect(self, websocket: WebSocket, client_id: int, first_device):
        if first_device:
            await websocket.accept()
        
            if self.active_connections.get(client_id, 'nope') == 'nope':
                self.active_connections[client_id] = []
            self.active_connections[client_id].append(websocket)
        else:
            if self.active_connections.get(client_id, 'nope') == 'nope':
                print(self.active_connections, 'here we go')
                # raise WebSocketDisconnect
            await websocket.accept()
            self.active_connections[client_id].append(websocket)
            await self.send_message('second is here', client_id);
    
    def disconnect(self, websocket: WebSocket, client_id: int):
        self.active_connections[client_id].remove(websocket)
    
    async def send_message(self, message: str, client_id: int):
        for connection in self.active_connections[client_id]:
            await connection.send_text(message)
    
manager = ConnectionManager()


@app.get("/", response_class=HTMLResponse)
async def get_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/board", response_class=HTMLResponse)
async def get_game(request: Request):
    return templates.TemplateResponse("board.html", {"request": request})

@app.websocket("/ws/{client_id}/{first_device}")
async def websocket_endpoint(websocket: WebSocket, client_id: int, first_device: bool):
    await manager.connect(websocket, client_id, first_device)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_message(f'{data}', client_id)
    except WebSocketDisconnect:
        print("websocket closed", client_id)
        manager.disconnect(websocket, client_id)
        # await manager.send_message(f'Player has left', client_id)