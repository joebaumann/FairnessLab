import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/Home";
import Data from "./Components/Data";
import FairnessLabAudit from "./Components/FairnessLabAudit/FairnessLabAudit";
import FairnessLabMakeFair from "./Components/FairnessLabMakeFair/FairnessLabMakeFair";
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
            <Route exact path="/" component={Home}/>
            <Route path="/data" component={Data}/>
            <Route path="/audit" component={FairnessLabAudit}/>
            <Route path="/improve" component={FairnessLabMakeFair}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="*" component={Error404}/>
          </Switch>
        
        </div>
      </Router>
    </div>
  );
}

export default App;