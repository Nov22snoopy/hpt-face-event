import { createBrowserHistory } from "history";
import "./App.css";
import { BrowserRouter} from "react-router-dom";
import Router from "./router";
import HomePage from './pages/homePage/HomePage'

function App() {
  const history = createBrowserHistory();
  return (
    <BrowserRouter>
      <Router history={history}></Router>
    </BrowserRouter>
  );
}

export default App;
