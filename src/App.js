import Router from "./Router";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector(state => state)
  return (
    <div>
      <span>{state.token}</span>
      <Router />
    </div>
  );
}

export default App;
