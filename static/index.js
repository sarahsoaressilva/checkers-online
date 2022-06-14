import { flowControl } from "./flowControl.js";
import { startNewGame, inviteSecondPlayer, join } from "./newGameBtn.js";

// Cada V e B são os butões(peças) do tabuleiro.
// Esse tabuleiro é atualizado mais abaixo.
export const board = [
    ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'],
    ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
    ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'],
    ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
    ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'],
    ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V'],
    ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'],
    ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V']
];

// Board default antes do jogo começar.
export const defaultBoard = [
    ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'],
    ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
    ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'],
    ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
    ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'],
    ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V'],
    ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'],
    ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V']
];

// Seleção do board para manipulação.
const boardElement = document.getElementById("board");

// Constante de atualização do board.
export const boardState = {
    color: 'W',
    mustAttack: false,
    isPicked: false,
    boardNow: board,
    pickedButton: 0,
    buttonPosition: 0,
    attackScenarios: [],
    isRemote: false,
    moveNumber: 0,
}

// Board default, antes do jogo começar.
export const defaultBoardState = {
    color: 'W',
    mustAttack: false,
    isPicked: false,
    boardNow: defaultBoard,
    pickedButton: 0,
    buttonPosition: 0,
    attackScenarios: [],
    isRemote: false,
    moveNumber: 0
}

// Cria vários botões como se fossem as peças.
// W e B = peças. V = livre.
for (let row = 0; row < board.length; row++) {
    // Para cada linha, lê o bloco abaixo.
    for (let man = 0; man < board.length; man++) { // man = coluna
        // Para cada coluna, cria-se um botão.
        let btn = document.createElement("button");
        btn.classList.add(board[row][man]); // Pega se é W | B e transforma em classe.
        btn.setAttribute('data-y', row); // Dá o numero da linha.
        btn.setAttribute('data-x', man); // Dá o numero da coluna.

       // Ao clicar no botão, atualiza o status do board na variável boardState.
        btn.onclick = function() {
            boardState.buttonPosition = btn;
            flowControl(boardState);
        }

        // Add o botão ao front.
        boardElement.appendChild(btn);
    }
}

const gameMenu = document.getElementsByClassName('game-menu')[0];

document.getElementById('sameDeviceBtn').onclick = startNewGame;

document.getElementById('firstDevicesBtn').onclick = inviteSecondPlayer;

document.getElementById('secondDeviceBtn').onclick = join;