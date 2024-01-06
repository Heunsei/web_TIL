/* eslint-disable */

import './App.css';
import { useState } from 'react'

function App() {
  let post = '부산 팬케이크 맛집'

  // a는 남자 코트 추천, b는 state를 변경을 도와주는 함수
  // useState 는 ref같은 용도인거 같음 데이터 바인딩 후 
  // state안에 있는 정보가 바뀌면 html이 자동으로 바뀜
  let [postTitles, changeTitle] = useState(['첫번째', '두번째', '세번째'])

  let num = [1, 2];
  // likePlue > state변경함수
  let [like, likePlus] = useState(0)

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

  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그</h4>
      </div>
      <button onClick={() => {
          let copy = [...postTitles];
          copy[0] = '이거에요';
          changeTitle(copy);
        }}>첫번째를 바꿔볼게요</button>
      <div className="list">
        <h4 style={{ color: 'red' }}> { postTitles[0] } </h4>
        <button onClick={ () => {likePlus(like+1)} }>👍</button> { like }
      </div>
      <div className="list">
        <h4 style={{ color: 'red' }}>{ postTitles[1] }</h4>
      </div>
      <div className="list">
        <h4 style={{ color: 'red' }}>{ postTitles[2] }</h4>
      </div>
    </div>
  );
}

export default App;
