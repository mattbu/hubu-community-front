import React from "react"
import { Navigate } from "react-router-dom"
const PrivateRoute = ({component}) => {
    const token = localStorage.getItem('token')

    if (token) {
        return component
    } else {
        alert('접근 권한이 없습니다. 로그인을 해주세요.')
        return <Navigate to="/login"></Navigate>
    }
}

export default PrivateRoute