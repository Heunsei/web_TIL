import React, { useEffect, useState } from 'react';

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onTimeout) {
                onTimeout()
            }
        }, timeout)
        return () => {
            clearTimeout(timer)
        }
    }, [onTimeout, timeout])

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
        }, 100);
        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <progress id="question-time"
            value={remainingTime}
            max={timeout}
            className={mode} />
    );
};

export default QuestionTimer;