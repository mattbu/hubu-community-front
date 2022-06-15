import Router from "./Router";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const state = useSelector(state => state)
  const token = localStorage.getItem('token')
  return (
    <div>
      <ToastContainer />
      <Header/>
      <Router />
    </div>
  );
}

export default App;
