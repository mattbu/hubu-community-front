import { Link } from 'react-router-dom'
import styles from '../../scss/ui/UserDropdown.module.scss'
import { isIOS } from 'react-device-detect'

function UserDropdown({ userInfo, logout }) {
    const toggleDropdown = (type) => {
        const dropdownMenu = document.querySelector('#dropdown-menu')
        if (type === 'toggle') dropdownMenu.classList.toggle(styles.show)
        else dropdownMenu.classList.remove(styles.show)
    }
    return (
        <div className={styles.userDropdown}>
            <button
                className={styles.userDropdownToggle}
                onClick={() => toggleDropdown('toggle')}
                onBlur={() => toggleDropdown('remove')}
                onMouseOut={isIOS ? () => toggleDropdown('remove') : null}
            >
                { userInfo.avatar_img ?
                <div className={styles.avatarPreview}><img src={userInfo.avatar_img}/></div>
                : <div className={styles.avatarDefault} />
                }
                <span className={styles.userName}>{userInfo.name}님 안녕하세요!</span>
            </button>
            <ul id="dropdown-menu" className={styles.userDropdownMenu}>
                <li className={styles.userDropdownMenuItem}>
                    <button>
                        <Link to="/my">내 정보</Link>
                    </button>
                </li>
                <li className={styles.userDropdownMenuItem}>
                    <button>
                        <Link to="/favorites">내가 좋아요한 게시글</Link>
                    </button>
                </li>
                <li className={styles.userDropdownMenuItem}>
                    <button onClick={logout}>로그아웃</button>
                </li>
            </ul>
        </div>
    )
}

export default UserDropdown