import { useEffect, useState } from "react";
import styles from '../scss/Comments.module.scss'
import { $axios, setHeadersToken } from "../utils/axios";
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from "react-bootstrap"
import { useParams } from "react-router-dom";
import moment from 'moment';
import { toast } from 'react-toastify'

function Comments() {
    const API_URL = process.env.REACT_APP_API_URL
    const token = localStorage.getItem('token')
    const currentUser = JSON.parse(localStorage.getItem('userData'))

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    let params = useParams()

    const getComments = () => {
        $axios.get(`/api/v1/comments/${params.id}`).then(res => {
            const {data} = res
            setComments(data)
        }).catch(err => {
            console.log(err);
        })
    }
    const postComment = (e) => {
        e.preventDefault()
        $axios.post(`api/v1/comments/${params.id}`, {
            user_id: currentUser.id,
            comment: comment
        }).then(res => {
            const {data: {message}} = res
            getComments()
            toast.success(message)
        }).catch(err => {
            console.log(err);
        })
    }
    const inputChange = (e) => {
        const {target: {value}} = e
        setComment(value)
    }
    useEffect(() => {
        setHeadersToken(token)
        getComments()
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                    <Card className={styles.commentContainer}>
                        <Container>
                            <Row>
                                <Col>
                                    <h6 className={styles.commentTitle}>댓글</h6>
                                    {
                                        comments.map(comment => {
                                            return (
                                                <Card key={comment.id} className={styles.commentCard}>
                                                   <Container className="px-0 mt-2">
                                                        <Row>
                                                            <Col xs={2} md={1} className="pe-0">
                                                                { comment.user?.avatar_img ? <div className={styles.avatarPreview}><img src={API_URL+comment.user?.avatar_img}/></div> : <div className={styles.avatarPreview} /> }
                                                            </Col>
                                                            <Col className="ps-0 ps-md-3 ps-lg-0">
                                                                <h6 className={styles.userName}>{comment.user?.name}</h6>
                                                                <h6 className={styles.date}>{moment(comment.created_at).format('YYYY-MM-DD hh:mm')}</h6>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                    {comment.comment}
                                                </Card>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col as="form" onSubmit={postComment}>
                                    <InputGroup>
                                        <FormControl placeholder="댓글을 남겨보세요." type="text" value={comment} onChange={inputChange}/>
                                        <Button className={styles.enrollBtn}>등록</Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Comments