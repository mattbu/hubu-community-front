import styles from '../scss/Detail.module.scss'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function Detail() {
    let params = useParams();
    let navigate = useNavigate();

    const token = localStorage.getItem('token')
    const currentUser = JSON.parse(localStorage.getItem('userData'))

    const [detail, setDetail] = useState({})
    const getDetail = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/boards/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setDetail(res.data)
    }
    useEffect(() => {
        getDetail()
    }, [])
    return (
        <div className={styles.detailContainer}>
            <h1>{detail.title}</h1>
            <p className={styles.textMuted}>작성자: {detail.user?.name}</p>
            <p className={styles.textMuted}>작성일: {moment(detail.created_at).format('YYYY-MM-DD hh:mm')}</p>
            <p className={styles.description}>{detail.description}</p>
            { currentUser.id === detail.user?.id ? <button onClick={() => navigate(`/detail/${params.id}/edit`, { state: {task: detail}})}>수정</button> : null }
        </div>
    )
}

export default Detail