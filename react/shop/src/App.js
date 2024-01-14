import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useState, Component } from "react"
import './App.css';
import IMG from './img/bg.png'
import data from './data.js'
import Detail from './page/detail.js'
// import Test from './components/detail/detail.js'

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate()
  let [isButton1Clicked, setIsButton1Clicked] = useState(false)
  let [buttonCount, setButtonCount] = useState(0)

  const AjaxPractice1 = () => {
    let urlNumber = 2
    if(buttonCount !== 0){
      urlNumber = 3
    }
    if (urlNumber <= 3) {
      setButtonCount(++buttonCount)
      setIsButton1Clicked(true)
      axios.get(`https://codingapple1.github.io/shop/data${urlNumber}.json`)
        .then((data) => {
          console.log(data.data)
          setShoes(() => {
            const copy = [...shoes]
            data.data.map((item) => {
              copy.push(item)
            })
            console.log(copy)
            // 로딩중 UI지우기
            return copy
          }
          )
        })
        .catch(() => {
          // 로딩중 UI지우기
          console.log('실패')
        })
    }
  }

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>ShoesShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
              <Nav.Link onClick={() => { navigate('/detail') }}>detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지로 이동</Link> */}

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage: `url(${IMG})` }}></div>
            <div className="container">
              <button onClick={() => {
                const copy = [...shoes].sort((a, b) => b.id - a.id)
                setShoes(copy)
              }}>sort</button>
              <div className="row">
                {
                  shoes.map((item, i) => {
                    return (
                      <ShoesBox key={item.id} item={item} i={item.id + 1}
                      />
                    )
                  })
                }
              </div>
            </div>
            <button onClick={() => {
              // 로딩중 이라는 UI띄우기
              AjaxPractice1()
            }}>버튼</button>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버에요</div>} />
          <Route path="location" element={<div>location</div>} />
        </Route>
        <Route path="*" element={<div>없는페이지</div>} />
      </Routes>
    </div>
  );
}

function ShoesBox(props) {
  const navigate = useNavigate()
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`} width="80%" alt='shoes3'
        onClick={() => { navigate(`/detail/${props.i}`) }} />
      <h4>{props.item.title}</h4>
      <p>{props.item.content}</p>
    </div>
  )
}



// const DetailPage = () => {
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt='shoes1'/>
//         </div>
//         <div className="col-md-6">
//           <h4 className="pt-5">상품명</h4>
//           <p>상품설명</p>
//           <p>120000원</p>
//           <button className="btn btn-danger">주문하기</button>
//         </div>
//       </div>
//     </div>
//   )
// }

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Modal() {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <p>로딩중 입니다</p>
        <button>닫기</button>
      </div>
    </div>
  )
}
export default App;
