import * as constants from "../resources/constants.js";

export default function getKingMoves(board, row, col) {
    const legalMoves = []
    const playerColor = board[row][col][0]

    // Define movement directions
    const directions = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
        [1, -1],
        [1, 1],
        [-1, 1],
        [-1, -1]
    ]

    for (const [deltaRow, deltaCol] of directions) {
        const newRow = row + deltaRow
        const newCol = col + deltaCol

        /* Check next direction if we reach the board edge */
        if (newRow < 0 || newRow >= constants.BOARD_SIZE || newCol < 0 || newCol >= constants.BOARD_SIZE) {
            continue
        }

        const piece = board[newRow][newCol]

        if (piece === null || piece[0] !== playerColor) {
            legalMoves.push([newRow, newCol])
        }
    }

    return legalMoves
}