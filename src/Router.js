import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom"
import Login from './components/Login'
import Register from "./components/Register"
import Boards from "./components/Boards"
import Write from "./components/Write"
import Detail from './components/Detail'
import Edit from "./components/Edit"
import Info from './components/Info'
import NotFound from "./components/NotFound"
import PrivateRoute from "./routes/PrivateRoute"
import { useSelector } from "react-redux"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"

function Router() {
    const { token } = useSelector(state => state)
    const container = useRef(null)
    const { pathname } = useLocation()
    const [fade, setFade] = useState('')
    useEffect(() => {
        let fadeTimer
        if (container) {
            fadeTimer = setTimeout(() => {
                setFade('end')
            }, 100)
        }
        return () => {
            clearTimeout(fadeTimer)
            setFade('')
        }
    }, [pathname])
    
    return (
        <div ref={container} className={`main-container start ${fade}`} >
            <Routes>
                <Route
                    path="/"
                    element={<PrivateRoute component={<Boards />} />} 
                />
                <Route
                    path="/write"
                    element={<PrivateRoute component={<Write />} />}
                />
                <Route
                    path="/detail/:id"
                    element={<PrivateRoute component={<Detail />} />} 
                />
                <Route
                    path="/detail/:id/edit"
                    element={<PrivateRoute component={<Edit />} />} 
                />
                <Route
                    path="/my"
                    element={<PrivateRoute component={<Info />} />} 
                />
                <Route path="/login" element={ !token ? <Login /> : <Navigate to="/"></Navigate>}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    )
}

export default Router