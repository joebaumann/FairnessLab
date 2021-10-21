import React from "react";
import Header from '../Header';
import './Home.css'

function Home() {
  return (
    <div>
      <Header title="Welcome to the Fairness Lab :)"/>
      {/* This tool is built to help you evaluate the fairness of your tool and improve it. */}
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
      <p>

      </p>

    </div>
  );
}

export default Home;