import React from 'react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const PRODUCTS = [
        { id: 'p1', title: 'product1' },
        { id: 'p2', title: 'product2' },
        { id: 'p3', title: 'product3' },
    ]

    return (
        <>
            <h1>Product Page</h1>
            <ul>
                {
                    PRODUCTS.map((element, i) => {
                        return (
                            <li key={i}>
                                <Link to={`${element.id}`}>
                                    {element.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    );
};

export default ProductsPage;