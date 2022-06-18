import axios from 'axios'
import { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from '../scss/Edit.module.scss'

function Edit() {
    let navigate = useNavigate();
    let {state: {task}} = useLocation();
    let params = useParams();

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)

    const token = localStorage.getItem('token')

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
        const confirm = window.confirm('글을 수정 하시겠어요?')
        if (confirm) {
            axios.put(`${process.env.REACT_APP_API_URL}/api/v1/boards/${params.id}`, form, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) //
        .then(res => {
            if (res.data) {
                alert('수정 성공')
                navigate('/')
            }
        })
        .catch(err => {
            alert(err.response.data.message)
            navigate(-1)
        })
        }
    }
    return (
        <>
            <Container className={styles.editContainer}>
                <Row>
                    <Col>
                        <h1>글 수정</h1>
                        <Container className="px-2">
                            <Row>
                                <Col as="form" onSubmit={editTask}>
                                    <label htmlFor="title">제목</label>
                                    <input id="title" name='title' type="text" value={title} onChange={handleInput} />
                                    <label htmlFor="description" name='description'>내용</label>
                                    <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={handleInput}></textarea>
                                    <Button className={styles.editBtn} type="submit">수정</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Edit