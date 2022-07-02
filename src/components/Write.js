import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../scss/Write.module.scss'
import axios from 'axios'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

function Write() {
    let navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleInput = (e) => {
        const {target: {name, value}} = e
        switch (name) {
            case 'title':
                setTitle(value)
                break
            case 'description':
                setDescription(value)
                break
            default:
        }
    }
    const writeTask = (e) => {
        e.preventDefault()
        const form = {
            title: title,
            description: description
        }
        const token = localStorage.getItem('token')
        confirmAlert({
            title: '게시물 등록',
            message: '글을 작성 하시겠어요?',
            buttons: [
              {
                label: '확인',
                onClick: () => {
                    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/boards`, form, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(res => {
                    const { data: { message } } = res
                    toast.success(message)
                    navigate('/')
                }).catch(err => {
                    console.log(err);
                    const { response: { data: message }} = err
                    toast.error(message.message)
                })
                }
              },
              {
                label: '취소',
                onClick: () => toast.error('글쓰기 등록이 취소 되었습니다.')
              }
            ]
          });
    }
    return (
        <>
            <Container className={styles.writeContainer}>
                <Row className={styles.writeRow}>
                    <Col xs={12} sm={12} md={12} lg={8} xl={6} className="form-container">
                        <h1>글쓰기</h1>
                        <p className='mb-4'>글을 작성해 보세요. ✍🏻</p>
                        <form className={styles.writeForm} onSubmit={writeTask}>
                            <label htmlFor="title">제목</label>
                            <input
                                id="title"
                                name='title'
                                type="text"
                                placeholder="글의 제목을 입력해 주세요."
                                value={title}
                                onChange={handleInput}
                            />
                            <label className='mt-3' htmlFor="description" name='description'>내용</label>
                            <textarea
                                id="description"
                                name="description"
                                cols="30"
                                rows="10"
                                placeholder="글의 내용을 입력해 주세요."
                                value={description}
                                onChange={handleInput}
                            />
                            <Button className={styles.writeBtn} type="submit">게시물 등록하기</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Write