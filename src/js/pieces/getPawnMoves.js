import * as constants from "../resources/constants.js"

/* WIP */
export default function getPawnMoves (board, row, col) {
    const legalMoves = []
    const playerColor = board[row][col][0]


    if (playerColor === constants.WHITE) {
        /* Check if we can move one square forward */
        if (row - 1 >= 0 && board[row - 1][col] === null) {
            legalMoves.push([row - 1, col])

            /* Check if we can move two squares forward */
            if (row === constants.RANK_2 && board[row - 2][col] === null) {
                legalMoves.push([row - 2, col])
            }
        }

        /* Check if we can capture a piece */
        const directions = [
            [-1, -1],
            [-1, 1]
        ]

        for (const [deltaRow, deltaCol] of directions) {
            const newRow = row + deltaRow
            const newCol = col + deltaCol

            /* Stop if we reach the board edge */
            if (newRow < 0 || newCol < 0 || newCol >= constants.BOARD_SIZE) {
                continue
            }

            const piece = board[newRow][newCol]

            if (piece !== null && piece[0] !== playerColor) {
                legalMoves.push([newRow, newCol])
            }
        }

        return legalMoves
    }

    if (playerColor === constants.BLACK) {
        /* Check if we can move one square forward */
        if (row + 1 < constants.BOARD_SIZE && board[row + 1][col] === null) {
            legalMoves.push([row + 1, col])

            /* Check if we can move two squares forward */
            if (row === constants.RANK_7 && board[row + 2][col] === null) {
                legalMoves.push([row + 2, col])
            }
        }

        /* Check if we can capture a piece */
        const directions = [
            [1, -1],
            [1, 1]
        ]

        for (const [deltaRow, deltaCol] of directions) {
            const newRow = row + deltaRow
            const newCol = col + deltaCol

            /* Stop if we reach the board edge */
            if (newRow >= constants.BOARD_SIZE || newCol < 0 || newCol >= constants.BOARD_SIZE) {
                continue
            }

            const piece = board[newRow][newCol]

            if (piece !== null && piece[0] !== playerColor) {
                legalMoves.push([newRow, newCol])
            }
        }

        return legalMoves
    }
}