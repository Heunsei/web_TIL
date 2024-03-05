import React from 'react';
import logoImg from '../assets/quiz-logo.png'

const Headers = () => {
    return (
        <header id='Header'>
            <img src={logoImg} alt="Quiz Logo" />
            <h1>React Quiz</h1>
        </header>
    );
};

export default Headers;