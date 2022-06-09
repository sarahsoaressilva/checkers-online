export const discardScenarios = (scenario, boardState) => {
    const newScenarios = boardState.attackScenarios.filter(el => {
        if (el.initial.y == scenario.initial.y &&
        el.initial.x == scenario.initial.x &&
        el.stops[0].y == scenario.stops[0].y &&
        el.stops[0].x == scenario.stops[0].x) {
            return true;
        } else {
            return false;
        }
    })
    boardState.attackScenarios = newScenarios;
}