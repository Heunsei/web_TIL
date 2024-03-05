import React from 'react';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

const Question = ({
    questionText,
    answers,
    onSelectAnswer,
    selectedAnswer,
    answerState,
    onSkipAnswer,
}) => {
    // component의 key속성을 통해 컴포넌트가 파괴되고 다시 랜더링 되게끔 할 수 있음

    return (
        <div id="question">
            <QuestionTimer
                timeout={5000}
                onTimeout={onSkipAnswer} />
            <h2>{ } </h2>
            <Answers
                answers={answers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onSelectAnswer}
            />
        </div>
    );
};

export default Question;