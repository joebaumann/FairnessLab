import './App.css';
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/Home";
import FairnessLabPareto from "./Components/FairnessLabPareto";
import COMPAS from "./Components/OtherPages/COMPAS";
import Contact from "./Components/OtherPages/Contact";
import { Error404 } from "./Components/OtherPages/ErrorPages";

function App() {

  return (
    <div>
      <HashRouter>

        <Navbar/>

        <div className="Content">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/audit" component={FairnessLabPareto}/>
            <Route path="/compas" component={COMPAS}/>
            <Route path="/contact" component={Contact}/>
            <Route path="*" component={Error404}/>
          </Switch>
        </div>

      </HashRouter>
    </div>
  );
}

export default App;