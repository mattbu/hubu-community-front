import React from "react"
import { Navigate, useLocation } from "react-router-dom"
const PrivateRoute = ({component}) => {
    const token = localStorage.getItem('token')
    const path = useLocation()

    if (token) {
        return component
    } else if (!token && path !== '/') {
        alert('접근 권한이 없습니다. 로그인을 해주세요.')
        return <Navigate to="/login"></Navigate>
    } else if (!token && path === '/' ) {
        return <Navigate to="/login"></Navigate>
    }
}

export default PrivateRoute