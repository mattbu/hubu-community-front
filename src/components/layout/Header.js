import { useNavigate, Link } from "react-router-dom"
import styles from '../../scss/layout/Header.module.scss'
import { Button, Navbar, Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { toast } from 'react-toastify'
import UserDropdown from "../ui/UserDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../slices/tokenSlice";
import { setUserInfo } from "../../slices/userSlice";
import { $axios, setHeadersToken } from "../../utils/axios";

function Header() {
    let navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL
    const { token, user } = useSelector(state => state)
    const userInfo = user

    const dispatch = useDispatch()

    const logout = async () => {
        try {
            setHeadersToken(token)
            const res = await $axios.delete(`${API_URL}/api/v1/logout`)
            const {data: {data: message}} = res
            toast.success(message)
            dispatch(setToken(null))
            dispatch(setUserInfo({}))
            // navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    // const logout = () => {
    //     toast.success('로그아웃 되었습니다.')
    //     dispatch(setToken(null))
    //     dispatch(setUserInfo({}))
    //     navigate('/')
    // }
    return (
        <Navbar bg="light" sticky="top" expand="lg" className={styles.headerContainer}>
            <Container className="pe-0">
                <Row className="justify-content-between w-100">
                    <Col xs={2} className="d-inline-flex">
                        <Button className={styles.backBtn} onClick={() => navigate(-1)}><ArrowLeft size={16}/></Button>
                        <Link to="/" className={styles.navBrand}>HUBU</Link>
                    </Col>
                    <Col className="text-right pe-0 align-self-center">
                        { token ? <UserDropdown userInfo={userInfo} logout={logout} /> : null }
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default Header