import Piece from './Piece.js'
import '../../css/components/Board.css'

const BOARDWIDTH = 8

export default function Board ({board}) {

    function generateSquareJSX (i, j) {
        const squareColor = (i % 2) === (j % 2) ? "lightSquare" : "darkSquare";
        const piece = board[j][i]

        return (
            <div className={squareColor}>
                <Piece piece={piece} />
            </div>
        )
    }

    function generateBoardJSX () {

        let boardJSX = []
        for (let i = 0; i < BOARDWIDTH; i++) {
            for (let j = 0; j < BOARDWIDTH; j++) {
                boardJSX.push(generateSquareJSX(i, j))
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