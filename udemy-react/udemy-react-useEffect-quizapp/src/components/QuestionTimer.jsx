import React, { useEffect, useState } from 'react';

const QuestionTimer = ({ timeout, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
        console.log('setting timeout')
        const timer = setTimeout(() => {
            onTimeout()
        }, timeout)
        return () => {
            clearTimeout(timer)
        }
    }, [onTimeout, timeout])


    useEffect(() => {
        console.log('setting interval')
        const timer = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
        }, 100);
        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <progress id="question-time" value={remainingTime} max={timeout} />
    );
};

export default QuestionTimer;