import { Routes, Route, Link, Navigate } from "react-router-dom"
import Login from './components/Login'
import Register from "./components/Register"
import Boards from "./components/Boards"
import Write from "./components/Write"
import Detail from './components/Detail'
import Edit from "./components/Edit"
import PrivateRoute from "./routes/PrivateRoute"
function Router() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<PrivateRoute component={<Boards />} />} 
                />
                {/* <Route path="/" element={ token ? <Navigate replace to="/boards"/> : <Navigate replace to="/login"/> }></Route> */}
                {/* <Route path="/boards" element={<Boards />}></Route> */}
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
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>}></Route>
            </Routes>
        </>
    )
}

export default Router