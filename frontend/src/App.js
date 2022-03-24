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
import Workflow from "./Components/Workflow";
import Data from "./Components/Data";
import FairnessLabAudit from "./Components/FairnessLabAudit";
import FairnessLabMakeFair from "./Components/FairnessLabImprove";
import FairnessLabPareto from "./Components/FairnessLabPareto";
import About from "./Components/OtherPages/About";
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
            {/* <Route path="/data" component={Data}/>
            <Route path="/workflow" component={Workflow}/> */}
            {/* <Route path="/audit" component={FairnessLabAudit}/>
            <Route path="/improve" component={FairnessLabMakeFair}/> */}
            <Route path="/pareto" component={FairnessLabPareto}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="*" component={Error404}/>
          </Switch>
        </div>

      </HashRouter>
    </div>
  );
}

export default App;