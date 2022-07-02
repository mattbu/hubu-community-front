import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from '../scss/Edit.module.scss'
import axios from 'axios'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector } from 'react-redux';

function Edit() {
    let navigate = useNavigate();
    let {state: {task}} = useLocation();
    let params = useParams();

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)

    const { token } = useSelector(state => state)

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
    const editTask = (e) => {
        e.preventDefault()
        const form = {
            title: title,
            description: description
        }

        confirmAlert({
            title: '게시물 수정',
            message: '글을 수정 하시겠어요?',
            buttons: [
              {
                label: '확인',
                onClick: () => {
                    axios.put(`${process.env.REACT_APP_API_URL}/api/v1/boards/${params.id}`, form, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(res => {
                        if (res.data) {
                            toast.success(res.data.message)
                            navigate('/')
                        }
                    }).catch(err => {
                        toast.error(err.response.data.message)
                        navigate(-1)
                    })
                }
              },
              {
                label: '취소',
                onClick: () => toast.error('글쓰기 수정이 취소 되었습니다.')
              }
            ]
          });
    }
    return (
        <>
            <Container className={styles.editContainer}>
                <Row className={styles.editRow}>
                    <Col xs={12} sm={12} md={12} lg={8} xl={6} className="form-container">
                        <h1>글 수정</h1>
                        <p className='mb-4'>글을 수정해 보세요. ✍🏻</p>
                        <form className={styles.editForm} onSubmit={editTask}>
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
                            <Button className={styles.editBtn} type="submit">게시물 수정하기</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Edit