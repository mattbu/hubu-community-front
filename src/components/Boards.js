import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from '../scss/Boards.module.scss'
import { $axios } from "../utils/axios"
import moment from "moment"
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'

function Boards() {
    let navigate = useNavigate()
    
    const API_URL = process.env.REACT_APP_API_URL
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
        const confirm = window.confirm('삭제 하시겠어요?')
        if (confirm) {
            $axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/boards/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const { data: {message}} = res
                toast.success(message)
                getList()
            }).catch(err => {
                toast.error(err.response.data.message)
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
                        { lists.length > 0 ? 
                            lists.map(item => {
                                return (
                                    <li key={item.id}>
                                        <Card className={styles.card}>
                                            <Container className={styles.cardHeader}>
                                                <Row>
                                                    <Col>
                                                        <h2 onClick={() => navigate(`/detail/${item.id}`, {state:{post:item}})}>{item.title}</h2>
                                                        <h6 className={styles.textMuted}>{moment(item.created_at).format('YYYY-MM-DD hh:mm')}</h6>
                                                    </Col>
                                                    { currentUser.id === item.user_id ? <Col xs={3} className="text-right">
                                                        <Button className={styles.deleteBtn} onClick={(e) => deletePost(e, item.id)}>삭제</Button>
                                                    </Col> : null 
                                                    }
                                                </Row>
                                            </Container>
                                            <Container className="px-0 mt-2">
                                                <Row>
                                                    <Col xs={1}>
                                                        {
                                                            item.user.avatar_img ? <div className={styles.avatarPreview}><img src={item.user.avatar_img}/></div>
                                                            : <div className={`${styles.avatarDefault}`} />
                                                        }
                                                    </Col>
                                                    <Col>
                                                        <h6 className={styles.userName}>{item.user.name}</h6>
                                                        <h6 className={styles.userEmail}>{item.user.email}</h6>
                                                    </Col>
                                                </Row>
                                            </Container>
                                            <p className={styles.description}>{item.description}</p>
                                        </Card>
                                    </li>
                                )
                            })
                            : <h3 className={styles.noContent}>게시글이 없습니다.</h3>
                        }
                    </ul>
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default Boards