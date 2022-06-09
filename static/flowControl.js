import { moveAhead } from "./moveAhead.js";
import { strike } from "./strike.js";
import { pickMan } from "./pickMan.js";
import { ws } from "./newGameBtn.js";
import { firstPlayer } from "./newGameBtn.js";

export const flowControl = boardState => {
    if (firstPlayer && boardState.color !== 'W' && boardState.isRemote ||
    !firstPlayer && boardState.color !== 'B' && boardState.isRemote) { return; }

    const btn = boardState.buttonPosition;
    const [newY, newX] = [parseInt(btn.dataset.y), parseInt(btn.dataset.x)];

    // We are free to choose a man at this point
    if (!boardState.mustAttack && btn.classList.contains(boardState.color)) {
        pickMan(boardState, btn);
        return;
    }
    if (!boardState.mustAttack && boardState.isPicked) { // Moving ahead
        moveAhead(boardState);
        if (boardState.isRemote) {
            ws.send(JSON.stringify(boardState));
        }
        return;
    }
    if (boardState.mustAttack && !boardState.isPicked) { // We can only pick those, who has to attack
        boardState.attackScenarios.forEach(scenario => {
            if (scenario.initial.y == parseInt(btn.dataset.y) && scenario.initial.x == parseInt(btn.dataset.x)) {
                pickMan(boardState);
            }
        });
        return;
    }
    if (boardState.mustAttack && boardState.isPicked) {
        strike(boardState);
        return;
    }
}