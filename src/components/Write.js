import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/Write.module.css'

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
        <div className={styles.writeContainer}>
            <h1>글쓰기</h1>
            <form onSubmit={writeTask}>
                <label htmlFor="title">제목</label>
                <input id="title" name='title' type="text" value={title} onChange={handleInput} />
                <label htmlFor="description" name='description'>내용</label>
                <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={handleInput}></textarea>
                <button type="submit">저장</button>
            </form>
        </div>
    )
}
export default Write