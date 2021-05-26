import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Components/Home/Home";
import FairnessLabMakeFair from "./Components/FairnessLabMakeFair/FairnessLabMakeFair";
import FairnessLabAudit from "./Components/FairnessLabAudit/FairnessLabAudit";
import About from "./Components/OtherPages/About";
import Contact from "./Components/OtherPages/Contact";
import { Error404 } from "./Components/OtherPages/ErrorPages";

function App() {

  return (
    <div>
      <Router>

        <header className="App-header">
          <h1><Link to="/">HOME</Link> nav bar ...</h1>
        </header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/audit">
            <FairnessLabAudit />
          </Route>
          <Route path="/makefair">
            <FairnessLabMakeFair />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;