import { useNavigate, Link } from "react-router-dom"
import styles from '../scss/Header.module.scss'
import { Button, Navbar, Container, Row, Col, NavDropdown, Nav, Dropdown } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { $axios, setHeadersToken } from '../utils/axios'
import UserDropdown from "./ui/UserDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slices/tokenSlice";
import { setUserInfo } from "../slices/userSlice";

function Header() {
    let navigate = useNavigate()

    const API_URL = process.env.REACT_APP_API_URL
    const { token, user } = useSelector(state => state)
    const userInfo = user

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    const logout = () => {
        toast.success('로그아웃 되었습니다.')
        dispatch(setToken(null))
        dispatch(setUserInfo({}))
        navigate('/')
    }
    useEffect(() => {
        // setHeadersToken(token)
        // const fetchUserInfo = $axios.get(`${API_URL}/api/v1/user_information`)
        // fetchUserInfo.then(res => {
        //     const {data: {data}} = res
        //     setUserName(data.name)
        //     setUserEmail(data.email)
        //     setDefaultImg(data.avatar_img)
        //     console.log(data.avatar_img);
        // })
    }, [])
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