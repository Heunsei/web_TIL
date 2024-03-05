import React, { useCallback, useState } from 'react';

import QUESTIONS from '../questions'
import quizCompleteImg from '../assets/quiz-complete.png'
import Question from './Question';

const Quiz = ({ }) => {
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex =
        answerState === '' ? userAnswers.length : userAnswers.length - 1

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    // activeQuestionIndex에 의해서 함수가 재생성 되어야 하므로 dependency 추가
    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setAnswerState('answerd')
        setUserAnswers((prev) => [...prev, selectedAnswer])
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, 1000);
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() =>
        handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="quiz complete" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSkipAnswer={handleSkipAnswer}
                onSelectAnswer={handleSelectAnswer}
            />
        </div>
    );
};

export default Quiz;