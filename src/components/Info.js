import styles from '../scss/Info.module.scss'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { $axios } from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../slices/userSlice'
import PasswordInput from './ui/PasswordInput'

function Info () {
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL
    const { token, user } = useSelector(state => state)

    const dispatch = useDispatch()

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordCheck, setNewPasswordCheck] = useState("")

    const [defaultImg, setDefaultImg] = useState('');
    const [newImg, setNewImg] = useState('');
    const [avatarImg, setAvatarImg] = useState(null);

    const inputChange = (e) => {
        const {target: {name, value}} = e
        switch (name) {
            case 'name':
                setUserName(value)
                break
            case 'new-password':
                setNewPassword(value)
                break
            default:
        }
    }
    const uploadAvatar = (e) => {
        const file = e.target.files[0]
        const maxSize = 2097152

        if (file !== undefined && file.size < maxSize) {
            setNewImg(URL.createObjectURL(file))
            setAvatarImg(file)
            setDefaultImg('')
        } else {
            toast.error('이미지 사이즈는 2MB 이내로 등록 가능합니다.')
        }
    }
    const getForm = () => {
        const form = new FormData()
        form.append('name', userName)
        form.append('avatar_img', avatarImg)
        form.append('password', newPassword)
        return form
    }

    const editInfo = (e) => {
        e.preventDefault()
        const form = getForm()
        const config = {
            headers: {
                'Content_Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        const updateUser = $axios.post(`${API_URL}/api/v1/user_information`, form, config)
        updateUser.then(res => {
            const { data: { data, message } } = res
            dispatch(setUserInfo(data))
            toast.success(message)
            navigate('/')
            
        }).catch(err => {
            toast.error(err.response.data.message)
        })
        
    }
    useEffect(() => {
        const fetchUserInfo = $axios.get(`${API_URL}/api/v1/user_information`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        fetchUserInfo.then(res => {
            const {data: {data}} = res
            setUserName(data.name)
            setUserEmail(data.email)
            setDefaultImg(data.avatar_img)
        })
    }, [])
    return (
        <Container className={styles.infoContainer}>
            <Row className={styles.infoRow}>
                <Col xs={12} sm={12} md={8} lg={6} xl={4} className={styles.formContainer}>
                    <h1>내 정보</h1>
                    <p>내 정보를 수정 하실 수 있습니다. 🔄</p>                    
                    <form onSubmit={editInfo} className={styles.infoContainerForm}>
                        <Form.Group controlId="formFile" className={`${styles.avatarFileGroup} mb-3`}>
                            <Form.Label>
                                <p className='mb-2'>대표 이미지</p>
                                {
                                    defaultImg ? <div className={styles.avatarPreview}><img src={defaultImg}/></div>
                                    : newImg ? <div className={styles.avatarPreview}><img src={
                                        `${newImg}`
                                    }/></div> :
                                    <div className={styles.avatarPreview}/> 
                                }
                            </Form.Label>
                            <Form.Control type="file" className={styles.avatarInput} onChange={uploadAvatar} />
                        </Form.Group>
                        <div>
                            <div>
                                <label htmlFor="email-input">아이디</label>
                                <input id="email-input" type="text" placeholder="아이디" value={userEmail} disabled/>
                                <small>아이디는 변경이 불가합니다.</small>
                            </div>
                            <label htmlFor="name-input" className={'mt-3'}>이름</label>
                            <input name="name" id="name-input" type="text" placeholder="이름" value={userName} onChange={inputChange}/>
                            <hr className='my-4' />
                            <h5 className={styles.passwordChangeTitle}>비밀번호 변경</h5>
                            <PasswordInput
                                password={newPassword}
                                passwordCheck={newPasswordCheck}
                                setPassword={setNewPassword}
                                setPasswordCheck={setNewPasswordCheck}
                                inputChange={inputChange}
                            />
                            <Button className={styles.editBtn} type="submit" disabled={(newPassword !== '' || newPasswordCheck !== '') &&  newPassword !== newPasswordCheck}>정보 수정</Button>
                        </div>
                    </form>
                </Col>
            </Row>
         </Container>
    )
}

export default Info