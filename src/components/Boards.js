import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from '../scss/Boards.module.scss'
import axios from "axios"
import moment from "moment"

function Boards() {
    let navigate = useNavigate()
    let params = useParams()
    
    const token = localStorage.getItem('token')
    const currentUser = JSON.parse(localStorage.getItem('userData'))

    const [lists, setLists] = useState([])
    const getList = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/boards`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setLists(res.data)
    }
    const deletePost = (e, id) => {
        const confirm = window.confirm('삭제하시겠어요?')
        if (confirm) {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/boards/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                alert('삭제 완료')    
                getList()
            }).catch(err => {
                alert(err.response.data.message)    
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
                                    <p className={styles.textMuted}>작성자: {item.user.name}</p>
                                    <p className={styles.textMuted}>작성자: {moment(item.created_at).format('YYYY-MM-DD hh:mm')}</p>
                                    <p className={styles.description}>{item.description}</p>
                                    { currentUser.id === item.user_id ? <button className={styles.deleteBtn} onClick={(e) => deletePost(e, item.id)}>삭제</button> : null }
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