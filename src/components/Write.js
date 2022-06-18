import axios from 'axios'
import { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import styles from '../scss/Write.module.scss'

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
        const confirm = window.confirm('글을 작성하시겠어요?')
        if (confirm) {
            axios.post(`${process.env.REACT_APP_API_URL}/api/v1/boards`, form, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) //
        .then(res => {
            alert('글쓰기 성공')
            navigate('/')

        })
        .catch(err => {
            alert('글쓰기 실패')
        })
        }
    }
    return (
        <>
            <Container className={styles.writeContainer}>
                <Row>
                    <Col>
                        <h1>글쓰기</h1>
                        <Container className='px-2'>
                            <Row>
                                <Col as="form" onSubmit={writeTask}>
                                    <label htmlFor="title">제목</label>
                                    <input id="title" name='title' type="text" value={title} onChange={handleInput} />
                                    <label htmlFor="description" name='description'>내용</label>
                                    <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={handleInput}></textarea>
                                    <Button className={styles.writeBtn} type="submit">저장</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Write