import axios from "../utils/axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styles from '../scss/Login.module.scss'
import { setToken } from "../store"
import { Button } from "react-bootstrap"

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
            const { data: { token: { accessToken }, user}} = res
            const parsedUserData = JSON.stringify(user)
            // dispatch(setToken(accessToken))
            localStorage.setItem('token', accessToken)
            localStorage.setItem('userData', parsedUserData)
            navigate('/')
            
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
                <label htmlFor="password-input" className={'mt-3'}>비밀번호</label>
                <input name="password" id="password-input" type="password" placeholder="비밀번호" value={password} onChange={inputChange}/>
                <Button type="submit" className={styles.loginBtn}>로그인</Button>
            </form>
            <Link to="/register" className={styles.loginLink}>아이디가 없으신가요?</Link>
        </div>
    )
}

 export default Login