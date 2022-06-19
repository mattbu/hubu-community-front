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
    const [reply, setReply] = useState('');

    let params = useParams()

    const getComments = () => {
        $axios.get(`/api/v1/comments/${params.id}`).then(res => {
            const {data} = res
            setComments(data)
        }).catch(err => {
            console.log(err);
        })
    }
    const postComment = (e, id) => {
        e.preventDefault()
        $axios.post(`api/v1/comments/${id}/reply`, {
            user_id: currentUser.id,
            comment: reply
        }).then(res => {
            const {data: {message}} = res
            getComments()
            toast.success(message)
        }).catch(err => {
            console.log(err);
        })
    }
    const replyComment = (e) => {
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
        const {target: {value, name}} = e
        switch (name) {
            case 'comment':
                setComment(value)
                break
            case 'reply':
                setReply(value)
                break
            default:
        } 
    }
    const openReplyInput = (id) => {
        const input = document.getElementById(`reply-${id}`)
        input.hidden = !input.hidden
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
                                                        <Row className="mt-3">
                                                            <Col>
                                                                {comment.comment}
                                                            </Col>
                                                            <Col xs={2} md={4} className="text-right ps-0">
                                                                <Button className={styles.replyBtn} onClick={() => openReplyInput(comment.id)} type="button">답글쓰기</Button>
                                                            </Col>
                                                            {
                                                                comment.replies.length > 0 ?
                                                                <Col xs={12} className="mt-3">
                                                                    <h6 className={`${styles.commentTitle} mb-3`}>답글</h6>
                                                                    {
                                                                        comment.replies.map(reply => {
                                                                            return (
                                                                                <Card key={`reply-${reply.id}`} className={styles.replyCard}>
                                                                                    <Container className="px-0">
                                                                                        <Row>
                                                                                            <Col xs={2} md={1} className="pe-0">
                                                                                                { reply.user?.avatar_img ? <div className={styles.avatarPreview}><img src={API_URL+reply.user?.avatar_img}/></div> : <div className={styles.avatarPreview} /> }
                                                                                            </Col>
                                                                                            <Col className="ps-0 ps-md-3 ps-lg-0">
                                                                                                <h6 className={styles.userName}>{reply.user?.name}</h6>
                                                                                                <h6 className={styles.date}>{moment(reply.created_at).format('YYYY-MM-DD hh:mm')}</h6>
                                                                                            </Col>
                                                                                            <Col xs={12} className="mt-2">
                                                                                                {reply.comment}
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Container>
                                                                                </Card>
                                                                            )
                                                                        })
                                                                    }
                                                                </Col>
                                                                : null
                                                            }
                                                        </Row>
                                                        <Row className="mt-2" id={`reply-${comment.id}`} hidden as="form" onSubmit={(e) => postComment(e, comment.id)}>
                                                            <Col>
                                                                <InputGroup>
                                                                    <FormControl name="reply" placeholder="답글을 남겨보세요." type="text" value={reply} onChange={inputChange}/>
                                                                    <Button className={styles.enrollBtn} type="submit">등록</Button>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Card>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col as="form" onSubmit={postComment}>
                                    <InputGroup>
                                        <FormControl name="comment" placeholder="댓글을 남겨보세요." type="text" value={comment} onChange={inputChange}/>
                                        <Button className={styles.enrollBtn} type="submit">등록</Button>
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