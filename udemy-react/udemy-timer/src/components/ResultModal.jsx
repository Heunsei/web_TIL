import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
    const dialog = useRef();

    const userLost = remainingTime <= 0
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2)
    const score = Math.round(1 - remainingTime / (targetTime * 1000)) * 100
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className='result-modal' onClose={onReset}>
            {userLost ? <h2> You lose</h2> : <h2> Your result : {score}</h2>}
            <p> The Target Time was <strong> {targetTime} seconds.</strong></p>
            <p>You Stopped the timer with <strong>{formattedRemainingTime} seconds left</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>close</button>
            </form>
        </dialog >,
        document.querySelector('#modal')
    )
})

export default ResultModal