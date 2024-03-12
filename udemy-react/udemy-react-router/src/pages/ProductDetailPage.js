import React from 'react';
import { useParams, Link } from 'react-router-dom';
const ProductDetailPage = () => {
    const params = useParams()
    return (
        <>
            <h1>
                {params.productId}
            </h1>
            {/* Detail의 path에 있는 route 정의에서 products/:productId에서 뒤로가면
            부분하나가 전무 사라지는게 아니라 부모 url로 이동함 
            Link에서 relative 속성을 추가해 ='path' 를 넣어준다면 부분 하나만을 사라지게함
            다만 to에 절대경로가 있으면 이렇게 작동하지 않음*/}
            <p><Link to='..' relative='path'>back</Link></p>
        </>

    );
};

export default ProductDetailPage;