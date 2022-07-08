import { useState } from 'react'
import { useTransition } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { $axios } from '../utils/axios'
import BoardCard from './ui/BoardCard'
import LoadingSpinner from './ui/LoadingSpinner'
import styles from '../scss/Favorite.module.scss'
import OrderByButton from './ui/OrderByButton'
import Pagination from './ui/Pagination'

function Favorite() {
    const API_URL = process.env.REACT_APP_API_URL

    const { token } = useSelector(state => state)
    const [isPending, startTransition] = useTransition()

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(1)
    const [total, setTotal] = useState(1)

    const [favLists, setFavLists] = useState([])

    const getMyFavList = async (orderBy = 'desc', page = 1) => {
        try {
            const res = await $axios.get(`${API_URL}/api/v1/favorites`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    order_by: orderBy,
                    page: page,
                }
            })
            const { data: { data: { data, per_page, total } } } = res
            setFavLists(data)
            setPerPage(per_page)
            setTotal(total)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        startTransition(() => {
            getMyFavList('desc', currentPage)
        })
    }, [currentPage])

    return (
        <Container className={styles.favoriteContainer}>
            <Row>
                <Col>
                    <h1>내가 좋아요한 게시글</h1>
                    <p>좋아하는 게시글 목록입니다. 👍🏻</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <OrderByButton getList={getMyFavList}/>
                    { isPending ? <LoadingSpinner /> :
                        <ul className={styles.listContainer}>
                            { favLists.length > 0 ? 
                                favLists.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <BoardCard post={item} getList={getMyFavList} />
                                        </li>
                                    )
                                })
                                : 
                                <div className={styles.noContent}>
                                    <h3>좋아하는 게시글이 없습니다.</h3>
                                    <p>게시판에서 좋아하는 글을 저장해 보세요. ✔️</p>
                                    <button className={styles.toCommunityBtn}>
                                        <Link to={'/'}>커뮤니티로 이동</Link>
                                    </button>
                                </div>
                            }
                        </ul>
                    }
                    {favLists.length > 0 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} perPage={perPage} total={total} />}
                </Col>
            </Row>
        </Container>
    )
}

export default Favorite