import { Link } from 'react-router-dom'
import styles from '../../scss/ui/UserDropdown.module.scss'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'

function UserDropdown({ userInfo, logout }) {
    const toggleDropdown = () => {
        const dropdownMenu = document.querySelector('#dropdown-menu')
        dropdownMenu.classList.toggle(styles.show)
    }
    return (
        <div className={styles.userDropdown}>
            <button className={styles.userDropdownToggle} onClick={toggleDropdown}>
                { userInfo.avatar_img ?
                <div className={styles.avatarPreview}><img src={userInfo.avatar_img}/></div>
                : <div className={styles.avatarDefault} />
                }
                <span className={styles.userName}>{userInfo.name}님 안녕하세요!</span>
            </button>
            <ul id="dropdown-menu" className={styles.userDropdownMenu}>
                <li className={styles.userDropdownMenuItem}>
                    <Button>
                        <Link to="/my">마이페이지</Link>
                    </Button>
                </li>
                <li className={styles.userDropdownMenuItem}>
                    <Button onClick={logout}>로그아웃</Button>
                </li>
            </ul>
        </div>
    )
}

export default UserDropdown