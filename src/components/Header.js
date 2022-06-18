import { useLocation, useNavigate, Link } from "react-router-dom"
import styles from '../scss/Header.module.scss'
import { Button, Navbar, Container, NavDropdown, Nav, Dropdown } from 'react-bootstrap';
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";

function Header() {
    let navigate = useNavigate()
    const {pathname} = useLocation()
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('userData'))
    const [show, setShow] = useState(false)
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        alert('로그아웃 되었습니다.')
        navigate('/')
    }
    return (
        <>
            <Navbar bg="light" sticky="top" expand="lg" className={styles.headerContainer}>
                <Container>
                    <Button className={styles.backBtn} onClick={() => navigate(-1)}><FiArrowLeft/></Button>
                    <Link to="/" className={styles.navBrand}>HUBU</Link>
                    { token ? 
                        <Dropdown>
                            <Dropdown.Toggle className={styles.dropdownToggle}>
                                <div className={styles.avatarPreview}><img src={process.env.REACT_APP_API_URL+userInfo.avatar_img}/></div>
                                <span>{userInfo.name}님 안녕하세요</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Link to="/my">마이페이지</Link>
                                <Dropdown.Item>
                                    <Button className={styles.logoutBtn} onClick={logout}>로그아웃</Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        : null
                    }
                </Container>
            </Navbar>
            <div>
            </div>
        </>
    )
}

export default Header