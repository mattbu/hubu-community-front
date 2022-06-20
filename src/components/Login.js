import { $axios } from "../utils/axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styles from '../scss/Login.module.scss'
import { setToken } from "../store"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"

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
    // const getUserInfo = () => {
    //     try {
    //         $axios.get(`${API_URL}/api/v1/user_information`).then(res => {
    //             const {data: {data}} = res
    //             const parsedUserData = JSON.stringify(data)
    //             localStorage.setItem('userData', parsedUserData)
    //             navigate('/')
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    const login = async (e) => {
        e.preventDefault()
        const loginForm = {
            user_id: userId,
            password: password
        }
        try {
            const res = await $axios.post(`${API_URL}/api/v1/auth/login`, loginForm)
            const { data: { token: { accessToken }, user, message}} = res
            localStorage.setItem('token', accessToken)
            localStorage.setItem('isLogin', true)
            localStorage.setItem('userData', JSON.stringify(user))
            // setHeadersToken(accessToken)
            // getUserInfo()
            toast.success(message)
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {}, [])
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