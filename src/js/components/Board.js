import { useState } from 'react'

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
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
    ])
    
    const [player, setPlayer] = useState(constants.WHITE)
    const [playerTurn, setPlayerTurn] = useState(constants.WHITE)

    /* Helper function to modify the board */
    /* TODO: Call the API to update the board */
    function modifyBoard (old_row, old_col, new_row, new_col, piece) {
        const boardCopy = board
        boardCopy[old_row][old_col] = null
        boardCopy[new_row][new_col] = piece
        setBoard(boardCopy)
    }

    /* Helper function to check if an array is present 
       in an array of arrays */
    function arrayInArray (array, arrayOfArrays) {
        for (let i = 0; i < arrayOfArrays.length; i++) {
            if (array[0] === arrayOfArrays[i][0] && array[1] === arrayOfArrays[i][1]) {
                return true
            }
        }
        return false
    }
    
    const [selectedPiece, setSelectedPiece] = useState([null, null])
    const [hints, setHints] = useState([])

    /* Helper functions for hints and selections */
    function setSelection (row, col) {
        setSelectedPiece([row, col])
        setHints(getLegalMoves(board, row, col))
    }

    function resetSelection () {
        setSelectedPiece([null, null])
        setHints([])
    }

    function movePiece (clicked_row, clicked_col) {

        /* If it is not the player's turn, do nothing */
        if (player !== playerTurn) {
            return
        }

        /* If the clicked square is not the same color as the player,
           and the selected square is empty, do nothing */
        if (board[clicked_row][clicked_col] && 
            board[clicked_row][clicked_col][0] !== player && 
            selectedPiece[0] === null && 
            selectedPiece[1] === null) {
            return
        }

        const selected_row = selectedPiece[0]
        const selected_col = selectedPiece[1]

        /* If the selected piece is not empty, move it to the clicked square */
        if (selected_row != null && selected_col != null) {
            const selectedPieceName = board[selected_row][selected_col]

            /* If the selected piece is the same as the clicked piece, unselect it */
            if (clicked_row === selected_row && clicked_col === selected_col) {
                resetSelection()
                return
            }

            /* If the move is legal, move the piece */
            const legalMoves = getLegalMoves(board, selected_row, selected_col)
            if (arrayInArray([clicked_row, clicked_col], legalMoves)) {
                modifyBoard(selected_row, selected_col, clicked_row, clicked_col, selectedPieceName)
                resetSelection()
                return
            }

            /* If the move is not legal, and the clicked square is not empty,
                select that piece */
            if (board[clicked_row][clicked_col] && board[clicked_row][clicked_col][0] === player) {
                setSelection(clicked_row, clicked_col)
                return
            }

            /* if the move is not legal, and the clicked square is empty,
               unselect the piece */
            resetSelection()
            return
        }

        /* If the selected square is empty and the clicked square is not empty,
           select that piece */
        if (board[clicked_row][clicked_col]) {
            setSelection(clicked_row, clicked_col)
        }
    }

    function generateSquareJSX (row, col) {
        const piece = board[row][col]

        /* Determine the color of the square */
        const squareColor = (row % 2) === (col % 2) ? "lightSquare" : "darkSquare"
        const isSelected = selectedPiece[0] === row && selectedPiece[1] === col
        const squareClassName = isSelected ? "selectedSquare" : squareColor

        /* Check if the current square is a hint, and what type
           op hint */
        let isHint = arrayInArray([row, col], hints)
        const hintClassName =
            isHint && piece && selectedPiece && piece[0] !== selectedPiece[0]
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

        /* Whites view */
        if (player === constants.WHITE) {
            for (let row = 0; row < constants.BOARD_SIZE; row++) {
                for (let col = 0; col < constants.BOARD_SIZE; col++) {
                    boardJSX.push(generateSquareJSX(row, col))
                }
            }
        }

        /* Blacks view */
        else if (player === constants.BLACK) {
            for (let row = constants.BOARD_SIZE - 1; row >= 0; row--) {
                for (let col = constants.BOARD_SIZE - 1; col >= 0; col--) {
                    boardJSX.push(generateSquareJSX(row, col))
                }   
            }
        }

        return boardJSX
    }

    return (
        <>
            <div className="boardContainer">
                {generateBoardJSX()}
            </div>
            
            {/* Temporary for testing */}
            <button onClick={() => {
                if (player === constants.WHITE && playerTurn === constants.WHITE) {
                    setPlayerTurn(constants.BLACK)
                    setPlayer(constants.BLACK)
                } else {
                    setPlayerTurn(constants.WHITE)
                    setPlayer(constants.WHITE)
                }
            }} style={{
                position: "absolute",
                // height: "50px",
                // width: "50px",
                top: "50%",
                left: "20%",
                transform: "translate(-20%, -50%)"
            }}>Change Player</button>
        </>
    )
}