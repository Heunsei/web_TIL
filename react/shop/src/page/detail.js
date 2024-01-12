import { clear } from "@testing-library/user-event/dist/clear";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";

// let YellowBtn = styled.button`
//     background : ${props => props.bg};
//     color : black;
//     padding : 10px;
// `

// let MykBox = styled.div`
//     backgound : grey
//     padding : 20px
// `


function Detail(props) {

    let { id } = useParams();
    let [alert, setAlert] = useState(true);
    useEffect(() => {
        let a = setTimeout(() => {
            setAlert(false)
        }, 1000 * 2)
        return () => {
            // a있던거 지워주고 새로운 타이머 생성
            clearTimeout(a)
        }
    }, [])

    if (id >= 3) {
        return (
            <div>ㅈㅅ페이지강벗음</div>
        )
    } else {
        const product = props.shoes.filter((e) => e.id == id)

        return (
            <div className="container">
                {
                    alert === true ? 
                    <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div> : null
                }
                <div className="row">
                    <div className="col-md-6">
                        <img src={`https://codingapple1.github.io/shop/shoes${product[0].id}.jpg`} width="100%" alt={`shoes${product[0].id}`} />
                    </div>
                    <div className="col-md-6">
                        <input></input>
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