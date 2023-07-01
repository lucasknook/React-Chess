import * as constants from "../resources/constants.js";

export default function getRookMoves(board, row, col) {
    const legalMoves = []
    const playerColor = board[row][col][0]

    // Define movement directions
    const directions = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0]
    ]

    for (const [deltaRow, deltaCol] of directions) {
        for (let i = 1; i <= constants.BOARD_SIZE; i++) {
            const newRow = row + deltaRow * i
            const newCol = col + deltaCol * i

            /* Stop if we reach the board edge */
            if (newRow < 0 || newRow >= constants.BOARD_SIZE || newCol < 0 || newCol >= constants.BOARD_SIZE) {
                break
            }

            const piece = board[newRow][newCol]

            if (piece === null || piece[0] !== playerColor) {
                legalMoves.push([newRow, newCol])
            }

            if (piece !== null) {
                break
            }
        }
    }

    return legalMoves
}