import getKnightMoves from './getKnightMoves'
import getRookMoves from './getRookMoves'

export default function getKnookMoves (board, row, col) {
    let legalMoves = []

    legalMoves = legalMoves.concat(getKnightMoves(board, row, col))
    legalMoves = legalMoves.concat(getRookMoves(board, row, col))

    return legalMoves
}