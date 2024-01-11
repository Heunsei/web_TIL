import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useState, Component } from "react"
import './App.css';
import IMG from './img/bg.png'
import data from './data.js'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Detail from './page/detail.js'

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>ShoesShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
              <Nav.Link onClick={() => { navigate('/detail/') }}>Detail</Nav.Link>
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
                const copy = [...shoes].sort((a, b) => b.id - a.id )
                setShoes(copy)
              }}>sort</button>
              <div className="row">
                {
                  shoes.map((item, i) => {
                    return (
                      <ShoesBox key={item.id} item={item} i={item.id + 1} />
                    )
                  })
                }
              </div>
            </div>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
      </Routes>
    </div>
  );
}

function ShoesBox(props) {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`} width="80%" alt='shoes3' />
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
//           <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
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
export default App;
