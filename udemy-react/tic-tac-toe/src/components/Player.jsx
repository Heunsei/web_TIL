import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    const handleEditing = () => {
        console.log('is clicked')
        setIsEditing((editing) => !editing)
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    const handleChange = (event) => {
        setPlayerName(event.target.value)
    }

    return (
        <li className={isActive ? 'active' : null}>
            <span className='player'>
                {
                    isEditing ? <input type="text" required value={playerName} onChange={handleChange} /> :
                        <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditing()}>
                {
                    isEditing ? 'save' : 'edit'
                }
            </button>
        </li>
    )
}