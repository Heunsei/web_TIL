import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counter"
import authReducer from "./auth"

// configureStore -> 여러개의 리듀서들을 하나의 리듀서로 합치기가 가능
// 설정애서 reuder 프로퍼티를 설정
const store = configureStore({
    reducer: { counter: counterReducer, auth: authReducer }
})

export default store;