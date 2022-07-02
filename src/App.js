import Router from "./Router";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Header/>
      <Router />
    </div>
  );
}

export default App;
