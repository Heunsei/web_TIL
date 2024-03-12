import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const HomePage = () => {
    const navigate = useNavigate()

    function navigateHandler(){
        navigate('/products')
    }

    return (
        <>
            <h1>my home page</h1>
            <p>
                <Link to="/products">
                    the list of product.
                </Link>
            </p>
            <p>
                <button onClick={navigateHandler}>navigate</button>
            </p>

        </>
    );
};

export default HomePage;