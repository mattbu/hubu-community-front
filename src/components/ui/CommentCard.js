import { Container, Row, Col } from 'react-bootstrap'
import styles from '../../scss/Comments.module.scss'
import moment from 'moment';

function CommentCard({ reply }) {
    return (
        <Container className={styles.replyCard}>
            <Row>
                <Col className={styles.userInfoColumn}>
                    { reply.user?.avatar_img ? <div className={styles.avatarPreview}><img src={reply.user?.avatar_img}/></div> : <div className={styles.avatarDefault} /> }
                    <span className={styles.userInfo}>
                        <span className={styles.userName}>{reply.user?.name}</span>
                        <span> | </span>
                        <span className={styles.userEmail}>{reply.user?.email}</span>
                        <p className={styles.commentDate}>{moment(reply.created_at).format('YYYY-MM-DD hh:mm')}</p>
                    </span>
                </Col>
                <Col xs={12} className="mt-2">
                    {reply.comment}
                </Col>
            </Row>
        </Container>
    )
}

export default CommentCard