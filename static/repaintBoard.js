export const repaintBoard = boardState => {
    const boardNow = boardState.boardNow; 

    const makeNewRow = (row, rowNum) => {
        row.forEach((man, manNum) => {
            const y = rowNum.toString();
            const x = manNum.toString();
            const btn = document.querySelectorAll(`[data-y="${y}"][data-x="${x}"]`)[0];
            btn.classList.remove(...btn.classList);
            for (const c of man) {
                btn.classList.add(c);
            }
        });
    };

    boardNow.forEach((row, rowNum) => {
        makeNewRow(row, rowNum);
    });
}