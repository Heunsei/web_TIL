import React from 'react';
import PageContent from '../components/PageContent';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const ErrorPage = () => {
    // response를 throw 하게되면 status 필드를 포함하게 됨
    // error는 throw 한 객체가 될 것
    const error = useRouteError()

    let title = 'something sent wrong'
    let message = 'Something went wrong!'

    if (error.status === 500) {
        message = error.data.message
    }

    if (error.status === 404) {
        title = "Not found!"
        message = 'Could not find resource or page'
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
};

export default ErrorPage;