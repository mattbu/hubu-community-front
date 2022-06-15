import { useLocation, useNavigate } from "react-router-dom"
import styles from '../scss/Header.module.scss'
import { Button } from 'react-bootstrap';
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
        <div>
            {
                token ? 
                <div className={styles.headerContainer}>
                    { pathname !== '/' ? <Button className={styles.backBtn} onClick={() => navigate(-1)}><FiArrowLeft/></Button> : null}
                    {/* <div>
                        <Button className={styles.dropdownBtn} onClick={() => setShow(currnt => !currnt)}>드랍다운</Button>
                        { show ? <ul className={ show ? `${styles.dropdownMenu} show` : `${styles.dropdownMenu}`}><li>asd</li></ul> : null }
                    </div> */}
                    <div className={styles.avatarPreview}><img src={process.env.REACT_APP_API_URL+userInfo.avatar_img}/></div>
                    <Button className={styles.logoutBtn} onClick={logout}>로그아웃</Button>
                </div> : null}
        </div>
    )
}

export default Header