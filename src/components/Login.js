import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from '../css/Login.module.css'

function Login() {
    let navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const inputChange = (e) => {
        const {target: {name, value}} = e
        switch (name) {
            case 'id':
                setUserId(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
        }
    }
    const login = (e) => {
        e.preventDefault()
        const loginForm = {
            user_id: userId,
            password: password
        }
        axios.post('http://192.168.0.38:8000/api/v1/auth/login', loginForm) //
        .then(res => {
            console.log(res);
            navigate('/boards')
            
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className={styles.loginContainer}>
        <h1>로그인</h1>
        <form onSubmit={login}>
            <label htmlFor="id-input">아이디</label>
            <input name="id" id="id-input" type="text" placeholder="아이디" value={userId} onChange={inputChange}/>
            <label htmlFor="password-input">비밀번호</label>
            <input name="password" id="password-input" type="password" placeholder="비밀번호" value={password} onChange={inputChange}/>
            <button type="submit">로그인</button>
        </form>
        <a href="">아이디가 없으신가요?</a>
        </div>
    )
}

 export default Login