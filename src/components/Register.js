import { $axios } from '../utils/axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../scss/Register.module.scss'
import { toast } from 'react-toastify'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setToken } from '../slices/tokenSlice'
import { setUserInfo } from '../slices/userSlice'

function Register() {
    let navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()

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
    const login = (token) => {
        const loginForm = {
            user_id: userId,
            password: password
        }
        $axios.post(`${API_URL}/api/v1/auth/login`, loginForm) //
        .then(res => {
            const { data: { token: { accessToken }, user, message}} = res
            dispatch(setToken(accessToken))
            dispatch(setUserInfo(user))
            navigate('/')
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
        $axios.post(`${API_URL}/api/v1/auth/register`, form, config) //
        .then(res => {
            if (res) {
                const {data: { token, message }} = res
                toast.success(message)
                login(token)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <Container className={styles.registerContainer}>
                <Row className={styles.registerRow}>
                    <Col xs={12} sm={12} md={8} lg={6} xl={4} className={styles.formContainer}>
                        <h1>회원가입</h1>
                        <p>회원가입을 진행해 주세요. 👤</p>
                        <form onSubmit={register} className={styles.registerForm}>
                            <Form.Group controlId="formFile" className={`${styles.avatarFileGroup} mb-3`}>
                                <Form.Label>
                                    <p className='mb-2'>대표 이미지</p>
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
        </>
    )
}

export default Register