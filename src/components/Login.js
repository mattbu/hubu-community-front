import { $axios } from "../utils/axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styles from '../scss/Login.module.scss'
import { Container, Row, Col, Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { setUserInfo } from '../slices/userSlice'
import { setToken } from '../slices/tokenSlice'

function Login() {
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    console.log(process.env);
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
    const login = async (e) => {
        e.preventDefault()
        const loginForm = {
            user_id: userId,
            password: password
        }
        try {
            const res = await $axios.post('/api/v1/auth/login', loginForm)
            console.log("check")
            console.log(res);
            const { data: { token: { accessToken }, user, message}} = res
            console.log(res);
            dispatch(setUserInfo(user))
            dispatch(setToken(accessToken))
            toast.success(message)
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {}, [])
    return (
        <Container className={styles.loginContainer}>
            <Row className={styles.loginRow}>
                <Col xs={12} sm={12} md={8} lg={6} xl={4} className={styles.formContainer}>
                    <h1>로그인</h1>
                    <p>로그인을 하세요. 🔒</p>
                    <form onSubmit={login} className={styles.loginForm}>
                        <label htmlFor="id-input">아이디</label>
                        <input name="id" id="id-input" type="text" placeholder="아이디" value={userId} onChange={inputChange}/>
                        <label htmlFor="password-input" className={'mt-3'}>비밀번호</label>
                        <input name="password" id="password-input" type="password" placeholder="비밀번호" value={password} onChange={inputChange}/>
                        <Link to="/register" className={styles.loginLink}>아이디가 없으신가요?</Link>
                        <Button type="submit" className={styles.loginBtn}>로그인</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

 export default Login