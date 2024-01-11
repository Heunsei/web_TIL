import { useParams } from "react-router-dom"

function Detail(props) {

    let { id } = useParams();

    const product = props.shoes.filter((e) => e.id === id)

    if (id >= 3) {
        return (
            <div>ㅈㅅ페이지강벗음</div>
        )
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={`https://codingapple1.github.io/shop/shoes${product[0].id}.jpg`} width="100%" alt={`shoes${product[0].id}`}/>
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{product[0].title}</h4>
                        <p>{product[0].content}</p>
                        <p>{product[0].price}</p>
                        <button className="btn btn-danger">주문하기</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Detail