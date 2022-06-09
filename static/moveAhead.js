import { checkForTargets } from "./checkForTargets.js";
import { repaintBoard } from "./repaintBoard.js";

export const moveAhead = boardState => {
    const btn = boardState.buttonPosition;
    const [y, x] = [parseInt(btn.dataset.y), parseInt(btn.dataset.x)];
    const [pickedY, pickedX] = [parseInt(boardState.pickedButton.dataset.y), parseInt(boardState.pickedButton.dataset.x)];
    const color = boardState.color;
    if (btn.classList.contains(color) && btn != boardState.pickedButton) {
        boardState.pickedButton = btn;
        return;
    }
    if (btn.classList.contains('V')) {
        if (
        (boardState.pickedButton.classList.contains('Q') && Math.abs(y - pickedY) == Math.abs(x - pickedX)) ||
        (!boardState.pickedButton.classList.contains('Q') &&
        ((boardState.color == 'W' && y == pickedY - 1 && Math.abs(x - pickedX) == 1) ||
        (boardState.color == 'B' && y == pickedY + 1 && Math.abs(x - pickedX) == 1)))
        ) {

            // btn.classList.remove(...btn.classList);
            // btn.classList.add(...boardState.pickedButton.classList);
            boardState.boardNow[y][x] = boardState.boardNow[pickedY][pickedX];
    
            // boardState.pickedButton.classList.remove(...boardState.pickedButton.classList);
            // boardState.pickedButton.classList.add('V');
            boardState.boardNow[pickedY][pickedX] = 'V';
    
            if ((boardState.color == 'W' && y == 0) || (boardState.color == 'B' && y == boardState.boardNow.length - 1)) {
                if (!btn.classList.contains('Q')) { 
                    // btn.classList.add('Q');
                    boardState.boardNow[y][x] += 'Q';
                }
            }

            repaintBoard(boardState);

            boardState.isPicked = false;
            boardState.attackScenarios = checkForTargets(boardState);
            if (boardState.attackScenarios.length > 0) { boardState.mustAttack = true; }
            boardState.color = (boardState.color == 'W') ? 'B' : 'W';
        }
        
    }
}