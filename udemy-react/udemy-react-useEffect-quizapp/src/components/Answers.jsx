import React, { useRef } from 'react';

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
    const shuffledAnswers = useRef();
    // 한번만 섞고 멈춰서 제대로 작동을 안함
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort((a, b) => Math.random() - 0.5)
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer
                let cssClass = ''

                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected'
                }

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState
                }

                return (
                    <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)}
                            className={cssClass}>
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>
    );
};

export default Answers;