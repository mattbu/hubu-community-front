import { Routes, Route, Link } from "react-router-dom"
import Login from './components/Login'
import Register from "./components/Register"
import Boards from "./components/Boards"
import Write from "./components/Write"
import Detail from './components/Detail'
import Edit from "./components/Edit"
function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/boards" element={<Boards />}></Route>
                <Route path="/write" element={<Write />}></Route>
                <Route path="/detail/:id" element={<Detail />}></Route>
                <Route path="/detail/:id/edit" element={<Edit />}></Route>
            </Routes>
        </>
    )
}

export default Router