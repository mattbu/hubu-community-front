import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styles from '../css/Login.module.css'
import { setToken } from "../store"

function Login() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL

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
        axios.post(`${API_URL}/api/v1/auth/login`, loginForm) //
        .then(res => {
            const {data:{token: {accessToken}}} = res
            // dispatch(setToken(accessToken))
            localStorage.setItem('token', accessToken)
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
        <Link to="/register">아이디가 없으신가요?</Link>
        </div>
    )
}

 export default Login