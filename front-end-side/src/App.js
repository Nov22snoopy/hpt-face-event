import { createBrowserHistory } from "history";
import "./App.css";
import { BrowserRouter} from "react-router-dom";
import Router from "./router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { connectSocket } from "./store/socket/thunkAction";
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{dispatch(connectSocket())},[dispatch])
  const history = createBrowserHistory();
  return (
    <BrowserRouter>
      <Router history={history}></Router>
    </BrowserRouter>
  );
}

export default App;
