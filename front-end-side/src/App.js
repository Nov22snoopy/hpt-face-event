import { createBrowserHistory } from "history";
import "./App.css";
import { BrowserRouter} from "react-router-dom";
import Router from "./router";

function App() {
  const history = createBrowserHistory();
  return (
    <BrowserRouter>
      <Router history={history}></Router>
    </BrowserRouter>
  );
}

export default App;
