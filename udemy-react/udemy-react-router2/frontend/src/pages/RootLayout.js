import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const RootLayout = () => {
    const navigation = useNavigation();

    // idle, loading, submitting 셋 중 하나
    // 라우트 전환이 이루어지고 로딩중인지, 제출중인지를 판별
    // 로딩 인디케이터는 페이지에 추가되는게아니라
    return (
        <>
            <MainNavigation />
            <main>
                {navigation.state === 'loading' && <p>loading</p>}
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;