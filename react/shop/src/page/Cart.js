import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, } from './../store'
import { changeHomework } from './../store/userSlice'

function Cart() {
    let name = useSelector((state) => state.user)
    let arrayData = useSelector((state) => state.homework)
    // return 안에는 어떤 state만 쓸지 정할 수 있음, .user 유저 항목만 가져옴
    let dispatch = useDispatch()

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrayData.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>
                                    <td><button onClick={() => {
                                        dispatch(changeHomework(i))
                                        console.log(name)
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart