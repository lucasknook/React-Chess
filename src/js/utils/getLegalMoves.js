import getBishopMoves from "../pieces/getBishopMoves"
import getKingMoves from "../pieces/getKingMoves"
import getKnightMoves from "../pieces/getKnightMoves"
import getPawnMoves from "../pieces/getPawnMoves"
import getQueenMoves from "../pieces/getQueenMoves"
import getRookMoves from "../pieces/getRookMoves"

/* Custom pieces */
import getKnookMoves from "../pieces/getKnookMoves"

export default function getLegalMoves (board, row, col) {

    /* If the square does not contain a piece, return an empty array. */
    if (board[row][col] === null) {
        return []
    }

    /* Call function depending on the piece. */
    const pieceName = board[row][col][1]
    
    switch (pieceName) {
        case "r":
            return getRookMoves(board, row, col)
        case "n":
            return getKnightMoves(board, row, col)
        case "b":
            return getBishopMoves(board, row, col)
        case "q":
            return getQueenMoves(board, row, col)
        case "k":
            return getKingMoves(board, row, col)
        case "p":
            return getPawnMoves(board, row, col)
        
        /* Custom pieces */
        case "ñ":
            return getKnookMoves(board, row, col)

        default:
            // Handle unknown piece
            throw new Error("getLegalMoves.js: Invalid piece name")
    }
}