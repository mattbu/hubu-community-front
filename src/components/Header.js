import { useNavigate } from "react-router-dom"

function Header() {
    let navigate = useNavigate()
    const token = localStorage.getItem('token')
    const logout = () => {
        localStorage.removeItem('token')
        alert('로그아웃 되었습니다.')
        navigate('/login')
    }
    return (
        <div>
            { token ? <button onClick={logout}>로그아웃</button> : null}
        </div>
    )
}

export default Header