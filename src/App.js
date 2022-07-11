import Router from "./Router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer autoClose={1000} hideProgressBar={true} />
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
