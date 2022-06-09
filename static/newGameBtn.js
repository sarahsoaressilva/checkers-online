import { defaultBoardState, boardState } from "./index.js";
import { repaintBoard } from "./repaintBoard.js";
import { deepCopyFunction } from "./deepCopy.js";

export let ws = false;
export let firstPlayer = false;
let connectionEstablished = false;
let ws_scheme = '';

if (window.location.protocol == "https:") {
    ws_scheme = "wss://";
} else {
    ws_scheme = "ws://";
};

const board = document.getElementsByClassName('board')[0];
const gameMenu = document.getElementsByClassName('game-menu')[0];
const menu = document.getElementsByClassName('menu')[0];

export const startNewGame = () => {
    menu.textContent = '';
    gameMenu.classList.remove("invisible", "underlayer");
    
    const newGameBtn = document.createElement("button");
    newGameBtn.classList.add('newGameBtn');
    newGameBtn.textContent = 'Novo Jogo';
    newGameBtn.onclick = function() {
        connectionEstablished = false;
        for (let key of Object.keys(defaultBoardState)) {
            boardState[key] = deepCopyFunction(defaultBoardState[key]);
        }

        repaintBoard(boardState);
        if (ws) { ws.close(); }
        gameMenu.classList.add("invisible", "underlayer");
        menu.textContent = '';
        board.classList.remove('rotated');
    }
    menu.appendChild(newGameBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add('cancelBtn');
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.onclick = function() {
        gameMenu.classList.add("invisible", "underlayer");
        menu.textContent = '';
    }
    menu.appendChild(cancelBtn);
}

export const inviteSecondPlayer = () => {
    menu.textContent = '';
    gameMenu.classList.remove("invisible", "underlayer");
    const getRandomId = max => {
        return Math.floor(Math.random() * max);
    }
    let client_id = getRandomId(10000);
    const invitation = document.createElement('div');
    invitation.classList.add('invitation');
    invitation.textContent = "Informe esse número ao outro jogador. Quando ele colocar o código, o jogo começará.";
    menu.appendChild(invitation);

    const wsId = document.createElement('div');
    wsId.classList.add('ws-id');
    wsId.textContent = client_id;
    menu.appendChild(wsId);

    if (ws) { ws.close(); }
    ws = new WebSocket(`${ws_scheme}${window.location.host}/ws/${client_id}/${true}`);
    
    ws.onmessage = function(event) {
        if (!connectionEstablished) {
            connectionEstablished = true;
            gameMenu.classList.add("invisible", "underlayer");
            menu.textContent = '';
            firstPlayer = true;
            return;

        }
        const newState = JSON.parse(event.data);
        for (let key of Object.keys(boardState)) {
            boardState[key] = newState[key]
        }
        repaintBoard(boardState); 
    
    };
    boardState.isRemote = true;
}

export const join = () => {
    menu.textContent = '';
    gameMenu.classList.remove("invisible", "underlayer");

    const inputId = document.createElement('input');
    inputId.setAttribute('type', 'number');
    inputId.setAttribute('name', 'boardId');
    inputId.setAttribute('placeholder', 'ID do Jogo');
    inputId.classList.add('input-board-id');

    const sendBtn = document.createElement('button');
    sendBtn.classList.add('send-btn');
    sendBtn.textContent = 'Jogar!';
    sendBtn.onclick = function() {
        const boardId = inputId.value;
        if (ws) { ws.close(); }
        ws = new WebSocket(`${ws_scheme}${window.location.host}/ws/${boardId}/${false}`);
        boardState.isRemote = true;

        ws.onmessage = function(event) {
            if (!connectionEstablished) {
                connectionEstablished = true;
                gameMenu.classList.add("invisible", "underlayer");
                menu.textContent = '';
                firstPlayer = false;
                return;
    
            }
            const newState = JSON.parse(event.data);
            for (let key of Object.keys(boardState)) {
                boardState[key] = newState[key];
            }
            repaintBoard(boardState);
        };
        
        board.classList.add('rotated');
    }
    menu.appendChild(inputId);
    menu.appendChild(sendBtn);
}