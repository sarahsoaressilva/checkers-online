import { boardState } from "./index.js";
import { repaintBoard } from "./repaintBoard.js"

// const getRandomId = max => {
//     return Math.floor(Math.random() * max);
// }

// let client_id = getRandomId(1000000);
// client_id = 1;
// document.querySelector("#ws-id").textContent = client_id;
// export let ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);

// ws.onmessage = function(event) {
//     const newState = JSON.parse(event.data);
//     for (let key of Object.keys(boardState)) {
//         boardState[key] = newState[key]
//     }
//     repaintBoard(boardState); 

// };