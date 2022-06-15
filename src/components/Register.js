import axios from '../utils/axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../scss/Register.module.scss'
import {toast} from 'react-toastify'
import { Button, Form } from 'react-bootstrap'

function Register() {
    let navigate = useNavigate()

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
    const login = () => {
        const loginForm = {
            user_id: userId,
            password: password
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, loginForm) //
        .then(res => {
            const { data: { token: { accessToken }, user}} = res
            const parsedUserData = JSON.stringify(user)
            localStorage.setItem('token', accessToken)
            localStorage.setItem('userData', parsedUserData)
            toast.success('asdasdsd')
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
            console.log(file);
          } else {
            this.certification_img = null;
          }
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
            if (res) {
                login()
            } else {
                setUserId('')
                setUserName('')
                setPassword('')
            }
        })
        .catch(err => {
            console.log(err,111);
        })
    }
    return (
        <div className={styles.registerContainer}>
            <h1>회원가입</h1>
            <form onSubmit={register}>
            <Form.Group controlId="formFile" className="mb-3">
                {
                    previewImg ? <div className={styles.avatarPreview}><img src={previewImg}/></div>
                    : <div className={styles.avatarPreview}/> 
                }
                <Form.Label>아바타 이미지</Form.Label>
                <Form.Control type="file" className={styles.avatarInput} onChange={uploadAvatar} />
            </Form.Group>
                <label htmlFor="id-input">아이디</label>
                <input name='id' id="id-input" type="text" placeholder="아이디" value={userId} onChange={inputChange} />
                <label htmlFor="name-input" className={'mt-3'}>이름</label>
                <input name='name' id="name-input" type="text" placeholder="이름" value={userName} onChange={inputChange} />
                <label htmlFor="password-input" className={'mt-3'}>비밀번호</label>
                <input name="password" id="password-input" type="password" placeholder="비밀번호" value={password} onChange={inputChange} />
                <Button className={styles.registerBtn} type="submit">회원가입</Button>
            </form>
        </div>
    )
}

export default Register