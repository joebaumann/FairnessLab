import React from "react";
import Header from '../Header';
import './Home.css';
import AMLD_workshop_picture_v1 from "./AMLD_workshop_picture_v1.png";
import AMLD_workshop_picture_v2 from "./AMLD_workshop_picture_v2.png";
import UZH_logo from "./UZH_logo.svg";

function Home() {
  return (
    <div>
      {/* <Header title="Welcome to the Fairness Lab :)"/> */}
      {/* <Header title="Fairness Lab @ Sounding Board 2021"/> */}
      {/* This tool is built to help you evaluate the fairness of your tool and improve it. */}
      {/*
      <h2>Vielen Dank für Deine Teilnahme an unserer Studie!</h2>
      <p>
        In der Navigationsleiste findest Du zwei Sektionen:
        <br/>
        <br/>
        <b>Audit</b>:
        <br/>
        Hier werden die Ergebnisse verschiedener Fairness Metriken visualisiert, welche zustande kommen, wenn das HR einen Utility-maximierenden Algorithmus verwendet.
        <br/>
        <br/>
        <b>Improve</b>:
        <br/>
        Hier kannst Du die Entscheidungsregel selbst verändern indem Du eine Group-Fairness-Metrik wählst, welche erfüllt werden soll.
        <br/>
        Zudem kannst du eine Equalization Rate wählen:
        <ul>
          <li>
            <b>0</b> heisst, dass die Metrik gar nicht erfüllt werden muss (was equivalent ist mit dem Utility-maximierenden Algorithmus).
          </li>
          <li>
            <b>1</b> heisst, dass die Metrik für beide Gruppen exakt gleich sein muss (in diesem Fall wird die Utility maximinert unter der Bedingung, dass die Gleichheit der Fairnessmetrik erfüllt ist).
          </li>
        </ul>
      </p>
      
      <h2>Thanks for joining today's Sounding Board meeting!</h2>
      <p>
        In the navigation bar you find the following two sections:
        <br/>
        <br/>
        <b>Audit</b>:
        <br/>
        This page visualizes the results of the various fairness metrics assuming that the HR team applies a utility-maximizing algorithm.
        <br/>
        <br/>
        <b>Improve</b>:
        <br/>
        On this page, you can adjust the decision rule by choosing a fairness metric that should be satisfied.
        <br/>
        In addition to that, you can choose to what extent the chosen metric should be satisfied by changing the equalization rate:
        <ul>
          <li>
            <b>Equalization rate=0</b> means that the chosen metric does not need to be satisfied at all (this is equivalent to the utility-maximizing algorithm).
          </li>
          <li>
            <b>Equalization rate=1</b> means that the chosen metric must be fully satisfied. Hence, the compared rates must be equal for both groups. In this case the utility is maximized subject to the fairness constraint.
          </li>
        </ul>
      </p>
      */}

      <Header title="Fairness Lab @ Informatics, Ethics and Society"/>
      <img src={UZH_logo} alt="Workshop Picture" width="40%" height="1%" />
      <h2>Thank you for joining today's lecture!</h2>
      <p style={{textAlign: 'center'}}>
        In the navigation bar you can find the section <b>model evaluation</b>. Choose a dataset to explore and follow the instructions to derive an optimal decision rule that also satisfies a morally appropriate definition of fairness.
        {/* <br/>
        <br/>
        <a href="https://appliedmldays.org/events/amld-epfl-2022/workshops/how-to-develop-fair-algorithms-using-the-fairness-lab-tool" target="_blank">Link to the workshop website</a>
        <br/>
        <br/>
        <a href="https://github.com/joebaumann/AMLD-EPFL2022-workshop-fair-algorithms" target="_blank">Link to the Jupyter Notebooks for the hands-on exercises</a> */}
      </p>
    </div>
  );
}

export default Home;