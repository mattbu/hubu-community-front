import styles from '../../scss/ui/OrderByButton.module.scss'
import { useState } from 'react'

function OrderByButton({ getList }) {
    const [orderBy, setOrderBy] = useState('desc')

    const changeOrder = (order = 'desc') => {
        setOrderBy(order)
        getList(order)
    }

    return (
        <div className={styles.orderBtnContainer}>
            <button className={orderBy === 'desc' ? styles.orderBtnActive : styles.orderBtn} onClick={() => changeOrder('desc')}>최신순</button>
            <button className={orderBy === 'asc' ? styles.orderBtnActive : styles.orderBtn} onClick={() => changeOrder('asc')}>등록순</button>
        </div>
    )
}

export default OrderByButton