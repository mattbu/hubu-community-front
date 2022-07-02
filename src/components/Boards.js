import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from '../scss/Boards.module.scss'
import { $axios } from "../utils/axios"
import { Button, Container, Row, Col  } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

import BoardCard from "./ui/BoardCard"
import LoadingSpinner from "./ui/LoadingSpinner"

function Boards() {
    let navigate = useNavigate()
    
    const API_URL = process.env.REACT_APP_API_URL
    const token = localStorage.getItem('token')

    const [isLoading, setIsLoading] = useState(false)
    const [lists, setLists] = useState([])
    const getList = async () => {
        try {
            setIsLoading(true)
            const res = await $axios.get(`${API_URL}/api/v1/boards`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLists(res.data)
            setIsLoading(false)
        } catch (err) {
            console.log(err);
        }
    }
    const deletePost = (e, id) => {
        confirmAlert({
            title: '게시물 삭제',
            message: '해당 글을 삭제 하시겠어요?',
            buttons: [
              {
                label: '확인',
                onClick: () => {
                    $axios.delete(`${API_URL}/api/v1/boards/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(res => {
                        const { data: { message }} = res
                        toast.success(message)
                        getList()
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
    useEffect(() => {
        getList()
    }, [])
    return (
        <> 
            { !isLoading ?
            <Container className={styles.boardContainer}>
                <Row>
                    <Col>
                        <h1>커뮤니티</h1>
                        <p>자유롭게 커뮤니티에 참여해 보세요. 👥</p>
                    </Col>
                    <Col className="text-right">
                        <Button className={styles.writeBtn} onClick={() => navigate('/write')}>글쓰기</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ul>
                            { lists.length > 0 ? 
                                lists.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <BoardCard post={item} getList={getList} deletePost={deletePost} />
                                        </li>
                                    )
                                })
                                : <h3 className={styles.noContent}>등록된 게시글이 없습니다.</h3>
                            }
                        </ul>
                    </Col>
                </Row>
            </Container> :
            <LoadingSpinner spinnerPadding={styles.boardContainer} />
            }
        </>
    )
}

export default Boards