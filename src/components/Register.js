import { $axios } from '../utils/axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../scss/Register.module.scss'
import { toast } from 'react-toastify'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'

function Register() {
    let navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL
    const token = localStorage.getItem('token')

    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [previewImg, setPreviewImg] = useState('');
    const [avatarImg, setAvatarImg] = useState(null);

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
    const getUserInfo = async (token) => {
        try {
            $axios.get(`${API_URL}/api/v1/user_information`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                const {data: {data}} = res
                const parsedUserData = JSON.stringify(data)
                localStorage.setItem('userData', parsedUserData)
                navigate('/')
            }).catch(err => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }
    }
    const login = (token) => {
        const loginForm = {
            user_id: userId,
            password: password
        }
        $axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, loginForm) //
        .then(res => {
            const { data: { token: { accessToken }, message}} = res
            localStorage.setItem('token', accessToken)
            // setHeadersToken(accessToken)
            toast.success(message)
            getUserInfo(accessToken)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const uploadAvatar = (e) => {
        const file = e.target.files[0];
       
        if (file !== undefined) {
            setPreviewImg(URL.createObjectURL(file))
            setAvatarImg(file)
            console.log(previewImg, avatarImg);
        }
    }

    const getForm = () => {
        const form = new FormData()
        form.append('name', userName)
        form.append('email', userId)
        form.append('avatar_img', avatarImg)
        form.append('password', password)
        return form
    }

    const register = (e) => {
        e.preventDefault()
        const form = getForm()
        const config = {
            headers: {
                'Content_Type': 'multipart/form-data'
            }
        }
        $axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, form, config) //
        .then(res => {
            if (res) {
                const {data: {token}} = res
                login(token)
            } else {
                // setUserId('')
                // setUserName('')
                // setPassword('')
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <Container className={styles.registerContainer}>
                <Row>
                    <Col>
                        <Card>
                            <Container>
                                <Row>
                                    <Col>
                                    <h1>회원가입</h1>
                                    <form onSubmit={register}>
                                        <Form.Group controlId="formFile" className={`${styles.avatarFileGroup} mb-3`}>
                                            <Form.Label>
                                            {
                                                previewImg ? <div className={styles.avatarPreview}><img src={previewImg}/></div>
                                                : <div className={styles.avatarPreview}/> 
                                            }
                                            </Form.Label>
                                            <Form.Control type="file" className={styles.avatarInput} onChange={uploadAvatar} />
                                        </Form.Group>
                                        <div>
                                            <label htmlFor="id-input">아이디</label>
                                            <input name='id' id="id-input" type="text" placeholder="아이디" value={userId} onChange={inputChange} />
                                            <label htmlFor="name-input" className={'mt-3'}>이름</label>
                                            <input name='name' id="name-input" type="text" placeholder="이름" value={userName} onChange={inputChange} />
                                            <label htmlFor="password-input" className={'mt-3'}>비밀번호</label>
                                            <input name="password" id="password-input" type="password" placeholder="비밀번호" value={password} onChange={inputChange} />
                                            <Button className={styles.registerBtn} type="submit">회원가입</Button>
                                        </div>
                                    </form>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register