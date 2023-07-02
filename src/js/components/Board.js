import { useEffect, useState } from 'react'

import * as constants from '../resources/constants.js'
import Piece from './Piece.js'
import Hint from './Hint.js'
import getLegalMoves from '../utils/getLegalMoves.js'

import '../../css/components/Board.css'

export default function Board () {

    const [board, setBoard] = useState([
        ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        [null, null, null, null, null, null, null, null],
        [null, 'bñ', null, null, null, null, null, null],
        [null, null, null, null, 'wñ', null, null, null],
        [null, null, null, null, null, null, null, null],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
    ])
    
    /* A piece can be moved by clicking on its square and its new position */
    const [selectedPiece, setSelectedPiece] = useState([null, null])
    const [hints, setHints] = useState([])
    function movePiece (clicked_row, clicked_col) {

        /* Set the hints for the selected piece */
        setHints(getLegalMoves(board, clicked_row, clicked_col))

        const selected_row = selectedPiece[0]
        const selected_col = selectedPiece[1]

        /* If the selected piece is not empty, move it to the clicked square */
        if (selected_row != null && selected_col != null) {
            const selectedPieceName = board[selected_row][selected_col]

            /* If the selected piece is the same as the clicked piece, unselect it */
            if (clicked_row === selected_row && clicked_col === selected_col) {
                setSelectedPiece([null, null])
                setHints([])
                return
            }

            /* Check if a move is legal by comparing the clicked square to the
                list of legal moves */
            const legalMoves = getLegalMoves(board, selected_row, selected_col)
            let isLegalMove = false
            for (let i = 0; i < legalMoves.length; i++) {
                if (legalMoves[i][0] === clicked_row && legalMoves[i][1] === clicked_col) {
                    isLegalMove = true
                    break
                }
            }

            /* If the move is legal, move the piece */
            if (isLegalMove) {
                const boardCopy = board
                boardCopy[clicked_row][clicked_col] = selectedPieceName
                boardCopy[selected_row][selected_col] = null
                setBoard(boardCopy)
                setHints([])
            }

            /* Unselect the piece */
            setSelectedPiece([null, null])
            return
        }

        /* If the selected square is empty and the clicked square is not empty,
           select that piece */
        if (board[clicked_row][clicked_col]) {
            setSelectedPiece([clicked_row, clicked_col])
        }
    }

    function generateSquareJSX (row, col) {
        const piece = board[row][col]

        /* Determine square color */
        const squareColor = (row % 2) === (col % 2) ? "lightSquare" : "darkSquare"

        /* Check if the current square is selected */
        const isSelected = selectedPiece[0] === row && selectedPiece[1] === col
        const squareClassName = isSelected ? "selectedSquare" : squareColor

        /* Check if the current square is a hint, and what type
           op hint */
        let isHint = false
        for (let i = 0; i < hints.length; i++) {
            if (hints[i][0] === row && hints[i][1] === col) {
                isHint = true
                break
            }
        }

        const hintClassName =
            isHint && piece && selectedPiece && piece[0] != selectedPiece[0]
                ? "capture-hint"
                : "normal-hint"

        /* Give each element a unique key */
        const key = "piece" + row * constants.BOARD_SIZE + col

        return (
            <div key={key} className={squareClassName} onClick={() => movePiece(row, col)}>
                {piece ? <Piece piece={piece} /> : null}
                {isHint ? <Hint className={hintClassName}/> : null}
            </div>
        )
    }

    function generateBoardJSX () {

        let boardJSX = []
        for (let row = 0; row < constants.BOARD_SIZE; row++) {
            for (let col = 0; col < constants.BOARD_SIZE; col++) {
                boardJSX.push(generateSquareJSX(row, col))
            }
        }

        return boardJSX
    }

    return (
        <div className="boardContainer">
            {generateBoardJSX()}
        </div>
    )
}