import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from '../scss/Boards.module.scss'
import { $axios } from "../utils/axios"
import moment from "moment"
import { Button, Container, Row, Col, Card } from 'react-bootstrap'

function Boards() {
    let navigate = useNavigate()
    
    const token = localStorage.getItem('token')
    const currentUser = JSON.parse(localStorage.getItem('userData'))

    const [lists, setLists] = useState([])
    const getList = async () => {
        try {
            const res = await $axios.get(`${process.env.REACT_APP_API_URL}/api/v1/boards`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLists(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    const deletePost = (e, id) => {
        const confirm = window.confirm('삭제하시겠어요?')
        if (confirm) {
            $axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/boards/${id}`, {
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
        <Container className={styles.boardContainer}>
            <Row>
                <Col>
                    <div className={styles.titleSection}>
                        <h1>리스트</h1>
                        <Button className={styles.writeButton} onClick={() => navigate('/write')}>글쓰기</Button>
                    </div>
                    <ul className={styles.listInit}>
                        {
                            lists.map(item => {
                                return (
                                    <li key={item.id}>
                                        <Card className={styles.card}>
                                            <div className={styles.titleSection}>
                                                <h2 onClick={() => navigate(`/detail/${item.id}`, {state:{post:item}})}>{item.title}</h2>
                                                { currentUser.id === item.user_id ? <Button className={styles.deleteBtn} onClick={(e) => deletePost(e, item.id)}>삭제</Button> : null }
                                            </div>
                                            <p className={styles.textMuted}>작성자: {item.user.name}</p>
                                            <p className={styles.textMuted}>작성자: {moment(item.created_at).format('YYYY-MM-DD hh:mm')}</p>
                                            <p className={styles.description}>{item.description}</p>
                                        </Card>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default Boards