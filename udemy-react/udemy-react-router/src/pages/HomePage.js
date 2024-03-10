import { Link } from 'react-router-dom';
import React from 'react';

const HomePage = () => {
    return (
        <>
            <h1>my home page</h1>
            <p>
                <Link to="/products">
                    the list of product.
                </Link>
            </p>

        </>
    );
};

export default HomePage;