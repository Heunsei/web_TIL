/* eslint-disable */

import './App.css';
import { useState } from 'react'
import VideoDownloader from './test'

function App() {
  let post = '부산 팬케이크 맛집'
  // a는 남자 코트 추천, b는 state를 변경을 도와주는 함수
  // useState 는 ref같은 용도인거 같음 데이터 바인딩 후 
  // state안에 있는 정보가 바뀌면 html이 자동으로 바뀜
  let [postTitles, setPostTitles] = useState(['첫번째', '두번째', '세번째'])
  let num = [1, 2];
  // likePlue > state변경함수
  let [like, setLike] = useState([0, 0, 0])
  // ui를 state로 저장
  let [modal, setModal] = useState(false)
  const testArr = [1, 2, 3]
  // map 사용법
  // 자료갯수만큼 코드 실행해줌
  let [titleIndex, setTitleIndex] = useState(0)
  let [inputValue, setInputValue] = useState('')
  // 자바스크립트에서의 데이터 저장은 데이터를 램에 저장해놓고 변수가 데이터를 가리키만함
  // 배열이나 오브젝트는 참조형 타입이기 때문에 사본을 만들어서 수정해야함
  // const updatePostTitle = () => {
  //   console.log('이거는 되나?')
  //   post1Change((prev) => {
  //     const newArr = [...prev]
  //     newArr[0] = 'hi'
  //     return newArr
  //   })
  // }

  function updateLike(i) {
    let copy = [...like]
    copy[i] += 1
    setLike(copy)
  }

  function modalControl(i) {
    setTitleIndex(i)
    if (modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그</h4>
      </div>
      <VideoDownloader/>
      <button onClick={() => {
        let copy = [...postTitles];
        copy[0] = '이거에요';
        setPostTitles(copy);
      }}>첫번째를 바꿔볼게요</button>
      <button onClick={() => {
        let copy = [...postTitles]
        copy.sort()
        setPostTitles(copy)
      }}>가나다순 정렬</button>

      <>
        {
          postTitles.map((item, i) => {
            return (
              // 왼쪽 array 자료만큼 내부코드 실행
              // return 오른쪽에 있는걸 array로 담아줌
              // i는 내부 map돌때마다 하나씩 증가
              <div className='list' key={item}>
                <p>{i}번째 게시글</p>
                <h4 onClick={() => { modalControl(i) }
                }>{item}</h4>
                <button onClick={() => { updateLike(i) }}>👍</button> {like[i]}
                <button onClick={() => {
                  const copy = [...postTitles]
                  copy[i] = '바뀌었나요?'
                  setPostTitles(copy)
                }}>글수정</button>
                <button onClick={() => {
                  setPostTitles(postTitles.filter((title) => title != postTitles[i]))
                }}>글 삭제</button>
              </div>
            )
          })
        }
      </>

      {
        modal == true ? <Modal postTitles={postTitles} titleIndex={titleIndex} /> : null
      }
      <form onSubmit={(event) => {
        event.preventDefault();
        console.log(event.target.test.value)
        const copy = [...postTitles]
        copy.push(inputValue)
        setPostTitles(copy)
      }}>
        <input name="test" type="textbox" onChange={(e) => {
          setInputValue(e.target.value)
        }
        } />
        {/* 제출버튼을 누르면 추가해주기  */}
        <button>제출</button>
      </form>
      {
        testArr.map((item) => {
          return (
            <div key={item}>실험</div>
          )
        })
      }
    </div>

  );
}

// const modal = () => { return(dasdasd)} 가능 ㅇㅇ
// 여기에서만 쓸거면 여기에 state 선언해도 될듯 ㅇㅇ
function Modal(props) {
  return (
    <>
      <div className="modal">
        <h1>{props.titleIndex}</h1>
        <h4>{props.postTitles[props.titleIndex]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </>
  )
}

// 동적인 ui 만들기
// 1. html css로 디자인 완성
// 2. UI의 상태를 state로 저장
// 3. state 에 따라 조건문으로 작성
// {} 안은 html을 써야해서 if가아니라 삼항연산자를 써야함

// 반복문으로 만들기
// var 어레이 = [];
// for (var i = 0; i < 3; i++) {
//   어레이.push(<div>안녕</div>)
// }
// return (
//   <div>
//     { 어레이 }
//   </div>
// )

export default App;
