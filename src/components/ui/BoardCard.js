import { useNavigate } from "react-router-dom"
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import styles from '../../scss/Boards.module.scss'
import moment from "moment"
import { Trash2, MessageCircle, ThumbsUp } from 'react-feather';
import { useSelector } from "react-redux";


function BoardCard({ post, getList, deletePost }) {
    let navigate = useNavigate()
    const { user } = useSelector(state => state)
    const currentUser = user
    return (
        <Container className={styles.card}>
            <Row>
                <Col xs={10} sm={11} className="pe-0">
                    <h5 className={styles.title} onClick={() => navigate(`/detail/${post.id}`, {state:{post:post}})}>{post.title}</h5>
                </Col>
                { currentUser.id === post.user_id ? <Col xs={2} sm={1} className="text-right ps-0">
                    <Button className={styles.deleteBtn} onClick={(e) => deletePost(e, post.id)}><Trash2 color="tomato" size={20} /></Button>
                </Col> : null 
                }
            </Row>
            <Row>
                <Col className={styles.avatarColumn}>
                    {
                        post.user.avatar_img ? <div className={styles.avatarPreview}><img src={post.user.avatar_img}/></div>
                        : <div className={`${styles.avatarDefault}`} />
                    }
                    <span className={styles.userInfo}>
                        <span>{post.user.name}</span>
                        <span className={styles.postDate}> | </span>
                        <span className={styles.userEmail}>{post.user.email}</span>
                        <p className={styles.postDate}>{moment(post.created_at).format('YYYY-MM-DD hh:mm')} 작성</p>
                    </span>
                </Col>
            </Row>
            <Row>
                <Col xs={8} md={10}>
                    <p className={styles.description}>{post.description}</p>
                </Col>
                <Col className="text-right align-self-center pe-0">
                    <ThumbsUp size={16} color={'#51557E'} />
                    <span className={styles.commentsLength}>{post.comments.length}</span>
                </Col>
                <Col className="text-right align-self-center ps-0">
                    <MessageCircle size={16} color={'#51557E'} />
                    <span className={styles.commentsLength}>{post.comments.length}</span>
                </Col>
            </Row>
        </Container>
    )
}

export default BoardCard