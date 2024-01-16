import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Cart() {

    let a = useSelector((state) => {return state})
    // return 안에는 어떤 state만 쓸지 정할 수 있음, .user 유저 항목만 가져옴
    console.log(a)

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
                    <tr>
                        <td>1</td>
                        <td>안녕</td>
                        <td>안녕</td>
                        <td>안녕</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Cart