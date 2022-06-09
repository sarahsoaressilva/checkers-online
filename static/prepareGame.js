import { boardState, defaultBoardState } from "./index.js";
import { repaintBoard } from "./repaintBoard.js";
import { ws } from "./newGameBtn.js";

const board = document.getElementsByClassName('board')[0];
const gameMenu = document.getElementsByClassName('game-menu')[0];
const menu = document.getElementsByClassName('menu')[0];

export const prepareGame = () => {
    for (let key of Object.keys(defaultBoardState)) {
        boardState[key] = deepCopyFunction(defaultBoardState[key]);
    }

    repaintBoard(boardState);
    if (ws) { ws.close(); }
    gameMenu.classList.add("invisible", "underlayer");
    menu.textContent = '';
    board.classList.remove('rotated');
}