/* Import all chess pieces */
import white_rook from '../../assets/pieces/wr.png'
import white_knight from '../../assets/pieces/wn.png';
import white_bishop from '../../assets/pieces/wb.png';
import white_queen from '../../assets/pieces/wq.png';
import white_king from '../../assets/pieces/wk.png';
import white_pawn from '../../assets/pieces/wp.png';

import black_rook from '../../assets/pieces/br.png';
import black_knight from '../../assets/pieces/bn.png';
import black_bishop from '../../assets/pieces/bb.png';
import black_queen from '../../assets/pieces/bq.png';
import black_king from '../../assets/pieces/bk.png';
import black_pawn from '../../assets/pieces/bp.png';

export default function Piece ({piece}) {

    function getPieceImageSrc (pieceName) {
        switch (pieceName) {
            case "wr":
                return white_rook;
            case "wn":
                return white_knight;
            case "wb":
                return white_bishop;
            case "wq":
                return white_queen;
            case "wk":
                return white_king;
            case "wp":
                return white_pawn;
            case "br":
                return black_rook;
            case "bn":
                return black_knight;
            case "bb":
                return black_bishop;
            case "bq":
                return black_queen;
            case "bk":
                return black_king;
            case "bp":
                return black_pawn;
            default:
                // Handle unknown piece or empty square
                return null;
        }
    }

    const pieceImageSrc = getPieceImageSrc(piece)
    if (pieceImageSrc) {
        return <img className="pieceImage" src={pieceImageSrc} alt={piece}></img>
    }

    return
}