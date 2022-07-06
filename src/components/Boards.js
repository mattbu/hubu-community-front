import { useEffect, useState, useTransition } from "react"
import { useNavigate } from "react-router-dom"
import styles from '../scss/Boards.module.scss'
import { $axios } from "../utils/axios"
import { Button, Container, Row, Col  } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import BoardCard from "./ui/BoardCard"
import LoadingSpinner from "./ui/LoadingSpinner"
import { useSelector } from "react-redux"
import Pagination from "./ui/Pagination"

function Boards() {
    let navigate = useNavigate()
    const { token } = useSelector(state => state)
    
    const API_URL = process.env.REACT_APP_API_URL

    const [isPending, startTransition] = useTransition()
    const [lists, setLists] = useState([])
    const [orderBy, setOrderBy] = useState('desc')

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(1)
    const [total, setTotal] = useState(1)

    const getList = async (orderBy, page) => {
        try {
            const res = await $axios.get(`${API_URL}/api/v1/boards`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    'order_by': orderBy,
                    page: page
                }
            })
            const { data: { data, per_page, total } } = res
            setLists(data)
            setPerPage(per_page)
            setTotal(total)
        } catch (err) {
            console.log(err);
        }
    }

    const changeOrder = (order) => {
        startTransition(() => {
            setOrderBy(order)
            getList(order)
        })
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
        startTransition(() => {
            getList(orderBy, currentPage)
        })
    }, [currentPage])

    return (
        <> 
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
                        <div className={styles.orderBtnContainer}>
                            <Button className={orderBy === 'desc' ? styles.orderBtnActive : styles.orderBtn} onClick={() => changeOrder('desc')}>최신순</Button>
                            <Button className={orderBy === 'asc' ? styles.orderBtnActive : styles.orderBtn} onClick={() => changeOrder('asc')}>등록순</Button>
                        </div>
                        {
                            isPending ? <LoadingSpinner /> :
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
                        }
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} perPage={perPage} total={total} />
                    </Col>
                </Row>
            </Container> 
        </>
    )
}

export default Boards