import './App.css';
import {
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
import About from "./Components/OtherPages/About";
import Contact from "./Components/OtherPages/Contact";
import { Error404 } from "./Components/OtherPages/ErrorPages";

function App() {

  return (
    <div>
      <Router>

        <Navbar/>

        <div className="Content">
          <Switch>
            <Route exact path="/FairnessLab" component={Home}/>
            {/* <Route path="/FairnessLab/data" component={Data}/>
            <Route path="/FairnessLab/workflow" component={Workflow}/> */}
            <Route path="/FairnessLab/audit" component={FairnessLabAudit}/>
            <Route path="/FairnessLab/improve" component={FairnessLabMakeFair}/>
            <Route path="/FairnessLab/about" component={About}/>
            <Route path="/FairnessLab/contact" component={Contact}/>
            <Route path="*" component={Error404}/>
          </Switch>
        
        </div>
      </Router>
    </div>
  );
}

export default App;