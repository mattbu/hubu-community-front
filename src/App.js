import Router from "./Router";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

function App() {
  // const state = useSelector(state => state)
  const token = localStorage.getItem('token')
  return (
    <div>
      <Navbar/>
      <Router />
    </div>
  );
}

export default App;
