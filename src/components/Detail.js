import styles from '../css/Detail.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Detail() {
    let params = useParams();
    let navigate = useNavigate();
    const [detail, setDetail] = useState({})
    const getDetail = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/boards/${params.id}`)
        setDetail(res.data)
    }
    useEffect(() => {
        getDetail()
    }, [])
    return (
        <div className={styles.detailContainer}>
            <h1>{detail.title}</h1>
            <p>{detail.description}</p>
            <button onClick={() => navigate(`/detail/${params.id}/edit`, { state: {task: detail}})}>수정</button>
        </div>
    )
}

export default Detail