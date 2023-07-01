import * as constants from "../resources/constants.js"

/* WIP */
export default function getPawnMoves (board, row, col) {
    const legalMoves = []
    const playerColor = board[row][col][0]

    const directions = []
    if (playerColor === "w") {
        directions.push([-1, 0])
        if (row === constants.RANK_2) {
            directions.push([-2, 0])
        }
    }

    if (playerColor === "b") {
        directions.push([1, 0])
        if (row === constants.RANK_7) {
            directions.push([2, 0])
        }
    }

    for (const [deltaRow, deltaCol] of directions) {

        const newRow = row + deltaRow
        const newCol = col + deltaCol

        /* Check next direction if we reach the board edge */
        if (newRow < 0 || newRow >= constants.BOARD_SIZE || newCol < 0 || newCol >= constants.BOARD_SIZE) {
            continue
        }

        const piece = board[newRow][newCol]

        if (piece === null) {
            legalMoves.push([newRow, newCol])
        }

        // if (piece !== null && piece[0] !== playerColor) {
        //     break
        // }
    }

    return legalMoves
}