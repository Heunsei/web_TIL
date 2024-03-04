

export default function GameBoard({ onSelectedSquare, board }) {


    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // const handleSelectSquare = (rowIndex, conIndex) => {
    //     setGameBoard((prev) => {
    //         const updated = [...prev.map(innerArray => [...innerArray])]
    //         updated[rowIndex][conIndex] = activePlayerSymbol;
    //         return updated
    //     })
    //     onSelectedSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectedSquare(rowIndex, colIndex)}
                                    disabled={playerSymbol !== null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}