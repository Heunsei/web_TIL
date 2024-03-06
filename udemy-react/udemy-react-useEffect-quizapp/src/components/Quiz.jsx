import React, { useCallback, useState } from 'react';

import QUESTIONS from '../questions'
import Question from './Question';
import Summary from './Summary';

const Quiz = ({ }) => {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    // activeQuestionIndex에 의해서 함수가 재생성 되어야 하므로 dependency 추가
    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prev) => [...prev, selectedAnswer])
    }, [])

    const handleSkipAnswer = useCallback(() =>
        handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
        return (
            <Summary userAnswers={userAnswers} />
        )
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSkipAnswer={handleSkipAnswer}
                onSelectAnswer={handleSelectAnswer}
            />
        </div>
    );
};

export default Quiz;