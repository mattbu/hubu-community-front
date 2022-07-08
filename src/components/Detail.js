import styles from '../scss/Detail.module.scss'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useTransition } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Container, Row, Col } from 'react-bootstrap'
import Comments from './Comments';
import LoadingSpinner from './ui/LoadingSpinner';
import { useSelector } from 'react-redux';
import { Heart } from 'react-feather';
import { $axios } from '../utils/axios';
import { toast } from 'react-toastify'

function Detail() {
    const { token, user } = useSelector(state => state) 
    const API_URL = process.env.REACT_APP_API_URL
    let params = useParams();
    let navigate = useNavigate();

    const currentUser = user

    const [isPending, startTransition] = useTransition()
    const [detail, setDetail] = useState({})
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    const getDetail = async () => {
        const res = await axios.get(`${API_URL}/api/v1/boards/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const { data: { data, likes } } = res
        console.log(res);
        setDetail(data)
        setLikeCount(likes)
        setLiked(data.is_liked_by_me)
    }

    const clickLike = () => {
        $axios.post(`${API_URL}/api/v1/board/like`, {
            id: params.id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            res.data.message && toast.success(res.data.message)
            getDetail()
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        startTransition(() => {
            getDetail()
        })
    }, [])

    return (
        <>
            { isPending ? <LoadingSpinner spinnerPadding={styles.detailContainer} /> :
                <div>
                    <Container className={styles.detailContainer}>
                        <Row>
                            <Col>
                                <h1>{detail.title}</h1>
                            </Col>
                        </Row>
                        <Row className={styles.userInfoRow}>
                            <Col sm={6} className={styles.userInfoColumn}>
                                { detail.user?.avatar_img ? <div className={styles.avatarPreview}><img src={detail.user?.avatar_img}/></div> 
                                : <div className={styles.avatarDefault} />
                                }
                                <span className={styles.userInfo}>
                                    <span className={styles.userName}>{detail.user?.name}</span>
                                    <span className={styles.postDate}> | </span>
                                    <span className={styles.userEmail}>{detail.user?.email}</span>
                                    <p className={styles.postDate}>{moment(detail.created_at).format('YYYY-MM-DD hh:mm')}</p>
                                </span>
                            </Col>
                            <Col sm={6} className={`${styles.userInfoColumnRight} text-right`}>
                                { currentUser.id === detail.user?.id ? 
                                    <Button 
                                        className={styles.editBtn}
                                        onClick={() => navigate(`/detail/${params.id}/edit`, { state: {task: detail}})}
                                    >수정</Button> : null
                                }
                                <button
                                    className={ liked ? `${styles.likeBtn} ${styles.clicked}` : `${styles.likeBtn}`}
                                    onClick={clickLike}
                                >
                                    <Heart size={20} color={'#51557E'} />
                                    <span>Like {likeCount}</span>
                                </button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <hr />
                                <p className={styles.description}>{detail.description}</p>
                            </Col>
                        </Row>
                    </Container>
                    <Comments />
                </div>
            }
        </>
    )
}

export default Detail