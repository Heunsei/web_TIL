import { clear } from "@testing-library/user-event/dist/clear";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"
import { Nav } from 'react-bootstrap'
import styled from "styled-components";

import { Context1 } from '../App'

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

    let { stock } = useContext(Context1) // 보관함에 있는거 가져와서 해체해줌

    let { id } = useParams();
    let [alert, setAlert] = useState(true);
    let [inputValue, setInputValue] = useState('')
    let [tab, setTab] = useState(0)
    let [fade, setFade] = useState('')

    useEffect(() => {
        let a = setTimeout(() => {
            setAlert(false)
        }, 1000 * 2)
        setFade('end')
        return () => {
            // a있던거 지워주고 새로운 타이머 생성
            clearTimeout(a)
            setFade('')
        }
    },)


    if (id >= 3) {
        return (
            <div>ㅈㅅ페이지강벗음</div>
        )
    } else {
        const product = props.shoes.filter((e) => e.id == id)
        return (
            <div className={`container start ${fade}`}>
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
                        <input value={inputValue}
                            onChange={(e) => {
                                if (Number.isInteger(+e.target.value)) {
                                    setInputValue(e.target.value)
                                } else {
                                    window.alert('잉')
                                }
                            }}
                            className='input-value'></input>
                        <h4 className="pt-5">{product[0].title}</h4>
                        <p>{product[0].content}</p>
                        <p>{product[0].price}</p>
                        <button className="btn btn-danger">주문하기</button>
                    </div>
                </div>
                <Nav variant="tabs" defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link onClick={() => setTab(0)} eventKey="link0">버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setTab(1)} eventKey="link1">버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setTab(2)} eventKey="link2">버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab = {tab} shoes = {props.shoes}/>
            </div>
        )
    }

}

function TabContent({tab, shoes}) {
    // if (tab == 0) {
    //     return <div>내용0</div>
    // } else if (tab == 1) {
    //     return <div>내용1</div>
    // } else if (tab == 2) {
    //     return <div>내용2</div>
    // }
    // 버튼을 누르는거나 tab이란 state가 변하는건 똑같으니 여기서 쳐보자
    let [fade, setFade] = useState('')
    let {stock} = useContext(Context1)
    useEffect(() => {
        let a = setTimeout(() => {setFade('end')}, 100)
        // automatic batching 기능 때문에 근처에 바꾸는게 있으면 하나로 합쳐서 바꿔줌
        // setTimeout이 없으면 그냥 한번에 뗏다붙였다 해서 변화가 없는것
        return () => {
            clearTimeout(a)
            setFade('')
        }
    },[tab])
    return (<div className={`start ${fade}`}>
     { [<div>{shoes[0].title}</div>, <div>{shoes[1].title}</div>, <div>{shoes[2].title}</div>][+tab] }
    </div>)
}



export default Detail