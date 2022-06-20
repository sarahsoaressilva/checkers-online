from crypt import methods
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.requests import Request

from utils.user import user, pesquisaUser


# Declara o uso da FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Monta os códigos independentes em um só lugar.
# Para evitar erros na API, add uma pasta na API.
# Deve-se reiniciar o servidor após adicionar, se não, não pega.
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/templates", StaticFiles(directory="templates"), name="templates")
app.mount("/img", StaticFiles(directory="img"), name="img")
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/utils", StaticFiles(directory="utils"), name="utils")


# Inicializa o Jinja com repositório em templates de forma estática.
# Ele procura dentro do diretório pelos templates.
templates = Jinja2Templates(directory="templates")

# API que retorna o index do jogo (tela de login)
@app.get("/", response_class=HTMLResponse)
async def get_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Inclui as rotas de login e cadastro.
app.include_router(user)


@app.get("/cadastrar", response_class=HTMLResponse)
async def get_cadastro(request: Request):
    return templates.TemplateResponse("cadastro.html", {"request": request})

# API que retorna o board do jogo como resposta.
# Recebe o objeto Request do FastAPI/Starlette como parâmetro.
# Request, neste caso, é o pedido feito pelo usuário para o servidor.
@app.get("/board", response_class=HTMLResponse)
async def get_game(request: Request):

    # Variável do Jinja + Função de retorno de um template.
    return templates.TemplateResponse("board.html", {"request": request})

@app.get("/loja", response_class=HTMLResponse)
async def getLoja(request: Request):
    return templates.TemplateResponse("loja.html", {"request": request})

# Classe de Conexão do Jogo.
class ConnectionManager:
    def __init__(self):

        # Define o tipo de dicionário (qual o key_value e o value_type).
        # Pode trocar para dicionário normal, sem ser do typing? Pois ele é vazio.
        self.active_connections: Dict() = {}

    # first_device é do tipo boolean. 1 = conectado, 0 = não conectado.
    # Função de conexão entre dois usuários.
    # Client_id = identifica o jogador. É o convide_id?
    async def connect(self, websocket: WebSocket, client_id: int, first_device):

       # Se o primeiro device está conectado, ele aceita a conexão.
        if first_device:
            await websocket.accept()

            # Procura nas conexões ativas onde o client_id é inexistente (não tem alguém conectado)?
            if self.active_connections.get(client_id, 'nope') == 'nope':
                self.active_connections[client_id] = []

            # Adiciona à chave client_id o valor WebSocket
            self.active_connections[client_id].append(websocket)
        else:
            # lista os clientes não conectados?
            if self.active_connections.get(client_id, 'nope') == 'nope':
                print(self.active_connections, 'here we go')
                # raise WebSocketDisconnect

            # Espera o segundo jogador aceitar a conexão?
            await websocket.accept()
            self.active_connections[client_id].append(websocket)
            await self.send_message('second is here', client_id)

    # Função para desconectar o usuário.
    # Tira o valor Websocket da chave client_id.
    def disconnect(self, websocket: WebSocket, client_id: int):
        self.active_connections[client_id].remove(websocket)

    # Função assincrona
    async def send_message(self, message: str, client_id: int):
        for connection in self.active_connections[client_id]:
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/ws/{client_id}/{first_device}")
async def websocket_endpoint(websocket: WebSocket, client_id: int, first_device: bool):

    # await serve para receber e mandar mensagens.
    await manager.connect(websocket, client_id, first_device)

    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_message(f'{data}', client_id)

    except WebSocketDisconnect:

        print("websocket closed", client_id)
        manager.disconnect(websocket, client_id)
        # await manager.send_message(f'Player has left', client_id)
