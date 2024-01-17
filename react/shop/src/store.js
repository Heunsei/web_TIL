import { configureStore, createSlice } from '@reduxjs/toolkit'
import { homework } from './store/userSlice'

let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
        changeName(state){
            // state는 위에있는 kim
            return 'john kim'
        },
    }
})

export let { changeName } = user.actions

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        homework : homework.reducer,
    }
})

