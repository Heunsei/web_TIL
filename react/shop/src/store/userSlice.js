import { createSlice } from '@reduxjs/toolkit'

let homework = createSlice({
    name: 'homework',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        changeHomework(state, i) {
            let id = state[i.payload].id
            let ary = state.find((data) => {
                if (data.id == id) {
                    return data
                }
            })
            ary.count += 1
        },
        addProduct(state, data) {
            let name = ''
            let isThere = false
            let array = ''
            state.map((element) => {
                if (element.name === data.payload.name) {
                    isThere = true
                    name = element.name
                    array = state.find((data) => {
                        if (data.name == name) {
                            return true
                        }
                    })
                }
            })
            if (isThere) {
                array.count += 1
            } else {
                state.push(data.payload)

            }
        }
    }
})

export let { changeHomework, addProduct } = homework.actions

export { homework }