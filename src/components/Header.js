import { useLocation, useNavigate, Link } from "react-router-dom"
import styles from '../scss/Header.module.scss'
import { Button, Navbar, Container, Row, Col, NavDropdown, Nav, Dropdown } from 'react-bootstrap';
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { $axios, setHeadersToken } from '../utils/axios'

function Header() {
    let navigate = useNavigate()

    const API_URL = process.env.REACT_APP_API_URL
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('userData'))

    const [show, setShow] = useState(false)

    const logout = () => {
        navigate('/')
        toast.success('로그아웃 되었습니다.')
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        localStorage.removeItem('isLogin')
        // setTimeout(() => {
        //     toast.success('로그아웃 되었습니다.')
        //     navigate('/')
        // }, 0)
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
        <>
            <Navbar bg="light" sticky="top" expand="lg" className={styles.headerContainer}>
                <Container fluid>
                    <Row className="justify-content-between">
                        <Col xs={4} className="d-inline-flex">
                            <Button className={styles.backBtn} onClick={() => navigate(-1)}><FiArrowLeft/></Button>
                            <Link to="/" className={styles.navBrand}>HUBU</Link>
                        </Col>
                        <Col xs={6} sm={4} className="text-right">
                        { token ? 
                        <Dropdown className={styles.dropdown}>
                            <Dropdown.Toggle className={styles.dropdownToggle}>
                                { userInfo.avatar_img ? <div className={styles.avatarPreview}><img src={userInfo.avatar_img}/></div>
                                :  <div className={styles.avatarDefault}/ >
                                }
                                <span>{userInfo.name}님 안녕하세요!</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={styles.dropdownMenu}>
                                <Container>
                                <Link to="/my">마이페이지</Link>
                                <Button className={styles.logoutBtn} onClick={logout}>로그아웃</Button>
                                </Container>
                            </Dropdown.Menu>
                       </Dropdown> : null
                        }
                        </Col>
                    </Row>
                </Container>
            </Navbar>
            <div>
            </div>
        </>
    )
}

export default Header