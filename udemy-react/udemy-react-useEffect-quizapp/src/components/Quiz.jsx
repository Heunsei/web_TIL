import React, { useState } from 'react';

import QUESTIONS from '../questions'

const Quiz = ({ }) => {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prev) => {
            return (
                [...prev, selectedAnswer]
            )
        })
    }

    return (
        <div id="question">
            <h2>{QUESTIONS[activeQuestionIndex].text} </h2>
            <ul id="answers">
                {QUESTIONS[activeQuestionIndex].answers.map((answer) => {
                    return (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Quiz;