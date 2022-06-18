import styles from '../scss/Detail.module.scss'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Container, Row, Col } from 'react-bootstrap'
import Comments from './Comments';

function Detail() {
    const API_URL = process.env.REACT_APP_API_URL
    let params = useParams();
    let navigate = useNavigate();

    const token = localStorage.getItem('token')
    const currentUser = JSON.parse(localStorage.getItem('userData'))

    const [detail, setDetail] = useState({})
    const getDetail = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/boards/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setDetail(res.data)
    }
    useEffect(() => {
        getDetail()
    }, [])
    return (
        <>
            <Container className={styles.detailContainer}>
                <Row>
                    <Col>
                        <Container className="px-0">
                            <Row>
                                <Col>
                                    <h1>{detail.title}</h1>
                                    <p className={styles.textMuted}>{moment(detail.created_at).format('YYYY-MM-DD hh:mm')}</p>
                                </Col>
                                { currentUser.id === detail.user?.id ? 
                                <Col xs={3} className="text-right">
                                    <Button className={styles.editBtn} onClick={() => navigate(`/detail/${params.id}/edit`, { state: {task: detail}})}>수정</Button>
                                </Col> 
                            : null 
                        }
                            </Row>
                        </Container>
                        <Container className="px-0 mt-2">
                            <Row>
                                <Col xs={2} md={1} className="pe-0">
                                    { detail.user?.avatar_img ? <div className={styles.avatarPreview}><img src={API_URL+detail.user?.avatar_img}/></div> 
                                    : <div className={styles.avatarPreview} />
                                    }
                                </Col>
                                <Col className="ps-0">
                                    <h6 className={styles.userName}>{detail.user?.name}</h6>
                                    <h6 className={styles.userEmail}>{detail.user?.email}</h6>
                                </Col>
                            </Row>
                        </Container>
                        <p className={styles.description}>{detail.description}</p>
                    </Col>
                </Row>
            </Container>
            <Comments />
        </>
    )
}

export default Detail