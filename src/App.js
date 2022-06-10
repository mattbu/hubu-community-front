import Router from "./Router";
import { useSelector } from "react-redux";
import Header from "./components/Header";

function App() {
  // const state = useSelector(state => state)
  const token = localStorage.getItem('token')
  return (
    <div>
      <Header/>
      <Router />
    </div>
  );
}

export default App;
