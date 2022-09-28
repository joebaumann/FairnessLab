import './App.css';
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/Home";
import Audit from "./Components/Audit";
import COMPAS from "./Components/OtherPages/COMPAS";
import FAQ from "./Components/OtherPages/FAQ";
import Contact from "./Components/OtherPages/Contact";
import { Error404 } from "./Components/OtherPages/ErrorPages";

function App() {

  return (
    <div>
      <HashRouter>

        <Navbar/>

        <div className="Page">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/audit/:demo?" component={Audit}/> {/* 'demo' is an optional parameter to load one of the compas audits described in the compas case study */}
            <Route path="/compas" component={COMPAS}/>
            <Route path="/faq" component={FAQ}/>
            <Route path="/contact" component={Contact}/>
            <Route path="*" component={Error404}/>
          </Switch>
        </div>

      </HashRouter>
    </div>
  );
}

export default App;