import { useTransition } from 'react'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { $axios } from '../utils/axios'

function Favorite() {
    const API_URL = process.env.REACT_APP_API_URL

    const {token} = useSelector(state => state)
    const [isPending, startTransition] = useTransition()

    const getMyFavList = async () => {
        try {
            const res = await $axios.get(`${API_URL}/api/v1/favorites`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const { data } = res
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        startTransition(() => {
            getMyFavList()
        })
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <h1>내가 좋아요한 게시글</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Favorite