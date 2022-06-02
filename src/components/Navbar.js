import { useNavigate } from "react-router-dom"

function Navbar() {
    let navigate = useNavigate()
    const token = localStorage.getItem('token')
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div>
            { token ? <button onClick={logout}>로그아웃</button> : null}
        </div>
    )
}

export default Navbar