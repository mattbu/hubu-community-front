import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from '../css/Write.module.css'

function Edit() {
    let navigate = useNavigate();
    let {state: {task}} = useLocation();
    let params = useParams();

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)

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
            axios.put(`${process.env.REACT_APP_API_URL}/api/v1/boards/${params.id}`, form) //
        .then(res => {
            console.log(res, '하하하하하');
            if(res.data){
                alert('수정 성공')
                navigate('/')
            }else{
                alert('다시 수정 요망')
            }

        })
        .catch(err => {
            alert('수정 실패')
        })
        }
    }
    return (
        <div className={styles.writeContainer}>
            <h1>글 수정</h1>
            <form onSubmit={editTask}>
                <label htmlFor="title">제목</label>
                <input id="title" name='title' type="text" value={title} onChange={handleInput} />
                <label htmlFor="description" name='description'>내용</label>
                <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={handleInput}></textarea>
                <button type="submit">수정</button>
            </form>
        </div>
    )
}
export default Edit