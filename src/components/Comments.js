import { useEffect, useState } from "react";
import styles from '../scss/Comments.module.scss'
import { $axios } from "../utils/axios";
import { Container, Row, Col, Button } from "react-bootstrap"
import { useParams } from "react-router-dom";
import moment from 'moment';
import { toast } from 'react-toastify'
import { CornerDownRight, Trash2 } from 'react-feather';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

import CommentCard from "./ui/CommentCard";
import { useSelector } from "react-redux";

function Comments() {
    const API_URL = process.env.REACT_APP_API_URL
    const { token, user } = useSelector(state => state)
    const currentUser = user

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [reply, setReply] = useState('');

    let params = useParams()

    const getComments = () => {
        $axios.get(`/api/v1/comments/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            const {data} = res
            setComments(data)
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const replyComment = (e, id) => {
        e.preventDefault()
        $axios.post(`api/v1/comments/${id}/reply`, {
            user_id: currentUser.id,
            comment: reply
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            const {data: {message}} = res
            setReply('')
            getComments()
            toast.success(message)
        }).catch(err => {
            console.log(err);
        })
    }
    const postComment = (e) => {
        e.preventDefault()
        $axios.post(`api/v1/comments/${params.id}`, {
            user_id: currentUser.id,
            comment: comment
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            const {data: {message}} = res
            setComment('')
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

    const deleteComment = (id) => {
        confirmAlert({
            title: '댓글 삭제',
            message: '해당 댓글을 삭제 하시겠어요?',
            buttons: [
              {
                label: '확인',
                onClick: () => {
                    $axios.delete(`${API_URL}/api/v1/comments/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(res => {
                        const { data: { message }} = res
                        toast.success(message)
                        getComments()
                    }).catch(err => {
                        toast.error(err.response.data.message)
                    })
                }
              },
              {
                label: '취소',
                onClick: () => toast.error('삭제가 취소 되었습니다.')
              }
            ]
          });
    }

    const openReplyInput = (id) => {
        const input = document.getElementById(`reply-${id}`)
        input.hidden = !input.hidden
    }
    useEffect(() => {
        // setHeadersToken(token)
        getComments()
    }, [])
    return (
        <Container>
            <Row>
                <Col xs={12} className={styles.commentContainer}>
                    <hr />
                    <h6 className={styles.commentTitle}>댓글 ({comments.length})</h6>
                    <div className={styles.commentFormContainer}>
                        <form className={styles.commentForm} onSubmit={postComment}>
                            <input className={styles.commentInput} type="text" name="comment" placeholder="댓글을 남겨보세요." value={comment} onChange={inputChange}/>
                            <Button className={styles.enrollBtn} type="submit">등록</Button>
                        </form>
                    </div>
                    {
                        comments.map(comment => {
                            return (
                                <Container key={comment.id} className={styles.commentCard}>
                                <Row>
                                    <Col className={styles.userInfoColumn}>
                                        { comment.user?.avatar_img ? <div className={styles.avatarPreview}><img src={comment.user?.avatar_img}/></div> : <div className={styles.avatarDefault} /> }
                                        <span className={styles.userInfo}>
                                            <span className={styles.userName}>{comment.user?.name}</span>
                                            <span> | </span>
                                            <span className={styles.userEmail}>{comment.user?.email}</span>
                                            <p className={styles.commentDate}>{moment(comment.created_at).format('YYYY-MM-DD hh:mm')}</p>
                                        </span>
                                    </Col>
                                    { currentUser.id === comment.user_id ? <Col className="text-right">
                                        <Button className={styles.commentDeleteBtn} onClick={(e) => deleteComment(comment.id)}>
                                            <Trash2 color="tomato" size={20} />
                                        </Button>
                                    </Col> : null }
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        {comment.comment}
                                    </Col>
                                    <Col xs={3} md={4} className="text-right ps-0">
                                        <Button className={styles.replyBtn} onClick={() => openReplyInput(comment.id)} type="button">답글쓰기</Button>
                                    </Col>
                                    {
                                        comment.replies.length > 0 ?
                                        <Col xs={12} className="mt-3">
                                            <h6 className={`${styles.commentTitle} mb-3`}>답글</h6>
                                            {
                                                comment.replies.map(reply => {
                                                    return (
                                                        <CommentCard key={`reply-${reply.id}`} reply={reply} />
                                                    )
                                                })
                                            }
                                        </Col>
                                        : null
                                    }
                                </Row>
                                <div id={`reply-${comment.id}`} className={styles.commentFormContainer} hidden>
                                    <form className={styles.commentForm} onSubmit={(e) => replyComment(e, comment.id)}>
                                        <label htmlFor="reply-input">
                                            <CornerDownRight color="#51557E" size={20} />
                                        </label>
                                        <input id="reply-input" className={styles.replyInput} name="reply" type="text" placeholder="답글을 남겨보세요." value={reply} onChange={inputChange} />
                                        <Button className={styles.enrollBtn} type="submit">등록</Button>
                                    </form>
                                </div>
                            </Container>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Comments