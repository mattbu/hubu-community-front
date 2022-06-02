import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from '../css/Boards.module.css'
import axios from "axios"

function Boards() {
    let navigate = useNavigate()
    let params = useParams()

    const [lists, setLists] = useState([])
    const getList = async () => {
        const res = await axios.get('http://192.168.0.38:8000/api/v1/boards')
        console.log(res, 'zzz');
        setLists(res.data)
    }
    const deletePost = (e, id) => {
        const confirm = window.confirm('삭제하시겠어요?')
        if (confirm) {
            axios.delete(`http://192.168.0.38:8000/api/v1/boards/${id}`)
            .then(res => {
                alert('삭제 완료')    
                getList()
            }).catch(err => {
                alert('삭제 실패!')    
            })
        } else {
            alert('삭제 취소됨')
        }
    }
    useEffect(() => {
        getList()
    }, [])
    return (
    <> 
        <div className={styles.titleContainer}>
            <h1>리스트</h1>
            <button onClick={() => navigate('/write')}>글쓰기</button>
        </div>
        <div>
            <ul className={styles.listInit}>
                {
                    lists.map(item => {
                        return (
                            <li key={item.id}>
                                <div className={styles.card}>
                                    <h2 onClick={() => navigate(`/detail/${item.id}`, {state:{post:item}})}>{item.title}</h2>
                                    <p>{item.description}</p>
                                    <button className={styles.deleteBtn} onClick={(e) => deletePost(e, item.id)}>삭제</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </>
    )
}

export default Boards