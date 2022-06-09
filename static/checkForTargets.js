import { deepCopyFunction } from "./deepCopy.js";
import { filterLongestScenarios } from "./filterLongestScenarios.js";

export const checkForTargets = boardState => {
    const nextColor = (boardState.color == 'W') ? 'B' : 'W';
    const len = boardState.boardNow.length;
    const scenariosTotal = [];
    for (let y = 0; y < len; y++) {
        for (let x = 0; x < len; x++) {
            if (!boardState.boardNow[y][x].includes(nextColor)) { continue; }
            const scenarios = findScenarios({'y': y, 'x': x}, boardState);
            if (scenarios.length > 0) {
                scenariosTotal.push(...scenarios);
            }
        }
    }
    // console.log((scenariosTotal.length > 0) ? filterLongestScenarios(scenariosTotal) : scenariosTotal);
    return (scenariosTotal.length > 0) ? filterLongestScenarios(scenariosTotal) : scenariosTotal;
}

const findScenarios = (man, boardState) => {
    const nextColor = (boardState.color == 'W') ? 'B' : 'W';
    const previousColor = boardState.color;
    const manResult = [];
    const map = deepCopyFunction(boardState.boardNow);
    const len = map.length;

    const researchScenario = (initial, current, eaten, map, res, stopPoints, previousDirection) => {
        const y = current['y'];
        const x = current['x'];

        if (!map[y][x].includes('Q')) {
            const challenges = [];
            if ( y > 1 && x > 1) { challenges.push([y-1, x-1, y-2, x-2]); }
            if ( y > 1 && x < len - 2) { challenges.push([y-1, x+1, y-2, x+2]); }
            if ( y < len - 2 && x > 1) { challenges.push([y+1, x-1, y+2, x-2]); }
            if ( y < len - 2 && x < len - 2) { challenges.push([y+1, x+1, y+2, x+2]); }
            
            let isOpponentClose = false;
            challenges.forEach(val => {
                if (map[val[0]][val[1]].includes(previousColor) && map[val[2]][val[3]] === 'V') {
                    const newMap = deepCopyFunction(map);
                    newMap[y][x] = 'V';
                    newMap[val[0]][val[1]] = 'V';
                    newMap[val[2]][val[3]] = map[y][x];
                    const newEaten = deepCopyFunction(eaten);
                    newEaten.push({'y': val[0], 'x': val[1]});
                    const newStopPoints = deepCopyFunction(stopPoints);
                    newStopPoints.push({'y': val[2], 'x': val[3]});
                    isOpponentClose = true;
                    researchScenario(initial, {'y': val[2], 'x': val[3]}, newEaten, newMap, (res + 1), newStopPoints, '');
                }
            });
            if ((!isOpponentClose && (nextColor == 'W' && y == 0) || (nextColor == 'B' && y == len - 1))) {
                const queenMap = deepCopyFunction(map);
                queenMap[y][x] += 'Q';
                researchScenario(initial, {'y': y, 'x': x}, eaten, queenMap, res, stopPoints, previousDirection);
            }
        }

        const queensHunt = (consideredSpots, nextY, nextX, previousDirection) => {
            consideredSpots.forEach(element => {
                const newMap = deepCopyFunction(map);
                newMap[nextY][nextX] = 'V';
                newMap[element['y']][element['x']] = map[y][x];
                newMap[y][x] = 'V';
                const newEaten = deepCopyFunction(eaten);
                newEaten.push({'y': nextY, 'x': nextX});
                const newStopPoints = deepCopyFunction(stopPoints);
                newStopPoints.push({'y': element['y'], 'x': element['x']});
                researchScenario(initial, {'y': element['y'], 'x': element['x']}, newEaten, newMap, (res + 1), newStopPoints, previousDirection);
            });
        }

        if (map[y][x].includes('Q')) {
            if (y > 1 && x > 1 && previousDirection != 'SE') {
                for (let nextY = y - 1, nextX = x - 1; (nextY > 0 && nextX > 0); nextY--, nextX--) {
                    if (map[nextY][nextX].includes(previousColor) && map[nextY - 1][nextX - 1].includes(previousColor)) { break; }
                    if (map[nextY][nextX].includes(nextColor)) { break; }
                    if (map[nextY][nextX].includes(previousColor) && map[nextY - 1][nextX - 1] == 'V') {
                        const consideredSpots = [];
                        for (let i = nextY - 1, j = nextX - 1; (i >= 0 && j >= 0); i--, j--) {
                            if (map[i][j].includes(nextColor) || map[i][j].includes(previousColor)) {
                                break;
                            }
                            consideredSpots.push({y: i, x: j});
                        }
                        if (consideredSpots.length > 0) {
                            queensHunt(consideredSpots, nextY, nextX, 'NW');
                        }
                    }
                }
            }
            if (y > 1 && x < len - 2 && previousDirection != 'SW') {
                for (let nextY = y - 1, nextX = x + 1; (nextY > 0 && nextX < len - 1); nextY--, nextX++) {
                    if (map[nextY][nextX].includes(previousColor) && map[nextY - 1][nextX + 1].includes(previousColor)) { break; }
                    if (map[nextY][nextX].includes(nextColor)) { break; }
                    if (map[nextY][nextX].includes(previousColor) && map[nextY - 1][nextX + 1] == 'V') {
                        const consideredSpots = [];
                        for (let i = nextY - 1, j = nextX + 1; (i >= 0 && j <= len - 1); i--, j++) {
                            if (map[i][j].includes(nextColor) || map[i][j].includes(previousColor)) {
                                break;
                            }
                            consideredSpots.push({y: i, x: j});
                        }
                        if (consideredSpots.length > 0) {
                            queensHunt(consideredSpots, nextY, nextX, 'NE');
                        }
                    }
                }
            }
            if (y < len - 2 && x > 1 && previousDirection != 'NE') {
                for (let nextY = y + 1, nextX = x - 1; (nextY < len - 1 && nextX > 0); nextY++, nextX--) {
                    if (map[nextY][nextX].includes(previousColor) && map[nextY + 1][nextX - 1].includes(previousColor)) { break; }
                    if (map[nextY][nextX].includes(nextColor)) { break; }
                    if (map[nextY][nextX].includes(previousColor) && map[nextY + 1][nextX - 1] == 'V') {
                        const consideredSpots = [];
                        for (let i = nextY + 1, j = nextX - 1; (i <= len - 1 && j >= 0); i++, j--) {
                            if (map[i][j].includes(nextColor) || map[i][j].includes(previousColor)) {
                                break;
                            }
                            consideredSpots.push({y: i, x: j});
                        }
                        if (consideredSpots.length > 0) {
                            queensHunt(consideredSpots, nextY, nextX, 'SW');
                        }
                    }
                }
            }
            if (y < len - 2 && x < len - 2 && previousDirection != 'NW') {
                for (let nextY = y + 1, nextX = x + 1; (nextY < len - 1 && nextX < len - 1); nextY++, nextX++) {
                    if (map[nextY][nextX].includes(previousColor) && map[nextY + 1][nextX + 1].includes(previousColor)) { break; }
                    if (map[nextY][nextX].includes(nextColor)) { break; }
                    if (map[nextY][nextX].includes(previousColor) && map[nextY + 1][nextX + 1] == 'V') {
                        
                        const consideredSpots = [];
                        for (let i = nextY + 1, j = nextX + 1; (i <= len - 1 && j <= len - 1); i++, j++) {
                            if (map[i][j].includes(nextColor) || map[i][j].includes(previousColor)) {
                                break;
                            }
                            consideredSpots.push({y: i, x: j});
                        }
                        if (consideredSpots.length > 0) {
                            queensHunt(consideredSpots, nextY, nextX, 'SE');
                        }
                    }
                }
            }
        }

        if (res > 0) {
            manResult.push({
                'initial': initial, 
                'final': current, 
                'eaten': eaten, 
                'map': map, 
                'counter': res, 
                'stops': stopPoints
            });
            res = 0;
        }
    }
    researchScenario(man, man, [], map, 0, [], '');
    return manResult;
}