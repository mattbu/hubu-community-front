import axios from 'axios'
import { useState } from 'react'
import styles from '../css/Register.module.css'

function Register() {
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
    const register = (e) => {
        e.preventDefault()
        const form = {
            email: userId,
            name: userName,
            password: password
        }
        axios.post('http://192.168.0.38:8000/api/v1/auth/register', form) //
        .then(res => {
            console.log(res);
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