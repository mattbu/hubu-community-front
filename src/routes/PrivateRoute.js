import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { toast } from 'react-toastify'
const PrivateRoute = ({component}) => {
    const { token } = useSelector(state => state)
    const { pathname } = useLocation()
    if (token) {
        return component
    } else {
        if (pathname !== '/') {
            toast.error('접근 권한이 없습니다. 로그인을 해주세요.')
        }
        return <Navigate to="/login"></Navigate>
    }
}

export default PrivateRoute