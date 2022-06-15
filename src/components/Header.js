import { useNavigate } from "react-router-dom"
import styles from '../scss/Header.module.scss'
import { Button } from 'react-bootstrap';

function Header() {
    let navigate = useNavigate()
    const token = localStorage.getItem('token')
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        alert('로그아웃 되었습니다.')
        navigate('/login')
    }
    return (
        <div>
            {
                token ? 
                <div className={styles.headerContainer}>
                    <Button className={styles.logoutBtn} onClick={logout}>로그아웃</Button>
                </div> : null}
        </div>
    )
}

export default Header