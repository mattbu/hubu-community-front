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
        // navigate('/')
    }
    return (
        <>
            <Navbar bg="light" sticky="top" expand="lg" className={styles.headerContainer}>
                <Container>
                    <Button className={styles.backBtn} onClick={() => navigate(-1)}><FiArrowLeft/></Button>
                    <Navbar.Brand href="#home">HUBU</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                    { token ? 
                        <Dropdown>
                            <Dropdown.Toggle className={styles.dropdownToggle}>
                                <div className={styles.avatarPreview}><img src={process.env.REACT_APP_API_URL+userInfo.avatar_img}/></div>
                                <span>{userInfo.name}님 안녕하세요</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item to="/my">마이페이지</Dropdown.Item>
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