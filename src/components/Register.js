import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../scss/Register.module.scss'

function Register() {
    let navigate = useNavigate()

    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const inputChange = (e) => {
        const {target: {name, value}} = e
        switch (name) {
            case 'id':
                setUserId(value)
                break
            case 'name':
                setUserName(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
        }
    }
    const login = () => {
        const loginForm = {
            user_id: userId,
            password: password
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, loginForm) //
        .then(res => {
            const {data:{token: {accessToken}}} = res
            localStorage.setItem('token', accessToken)
            navigate('/')
            
        })
        .catch(err => {
            console.log(err);
        })
    }
    const register = (e) => {
        e.preventDefault()
        const form = {
            email: userId,
            name: userName,
            password: password
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, form) //
        .then(res => {
            login()
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className={styles.registerContainer}>
            <h1>회원가입</h1>
            <form onSubmit={register}>
                <label htmlFor="id-input">아이디</label>
                <input name='id' id="id-input" type="text" placeholder="아이디" value={userId} onChange={inputChange} />
                <label htmlFor="name-input">이름</label>
                <input name='name' id="name-input" type="text" placeholder="이름" value={userName} onChange={inputChange} />
                <label htmlFor="password-input">비밀번호</label>
                <input name="password" id="password-input" type="password" placeholder="비밀번호" value={password} onChange={inputChange} />
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default Register