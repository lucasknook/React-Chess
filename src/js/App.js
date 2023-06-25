import Board from './components/Board.js'

import '../css/index.css'

export default function App() {

    const startingPosition = [
        ['br', 'bp', null, null, null, null, 'wp', 'wr'],
        ['bn', 'bp', null, null, null, null, 'wp', 'wn'],
        ['bb', 'bp', null, null, null, null, 'wp', 'wb'],
        ['bq', 'bp', null, null, null, null, 'wp', 'wq'],
        ['bk', 'bp', null, null, null, null, 'wp', 'wk'],
        ['bb', 'bp', null, null, null, null, 'wp', 'wb'],
        ['bn', 'bp', null, null, null, null, 'wp', 'wn'],
        ['br', 'bp', null, null, null, null, 'wp', 'wr']
    ];

    return (
        <div className="chessGame">
            <Board board={startingPosition}/>
        </div>
    )
}
