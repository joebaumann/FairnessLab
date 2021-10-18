import React from "react";
import Header from '../Header';

function About() {
  return (
    <div>
      <Header title="About"/>
      Hallo zusammen!<br/>
      Vielen Dank, dass ihr euch bereit erklärt habt bei unserem Experiment mitzumachen.
      Auf dem von uns ausgeteilten Informationsblatt findet ihr genaue Informationen zu diesem Experiment.
      Dieses Tool selbst ist bisher noch sehr einfach aufgebaut. Navigiert einfach zum Punkt "Improve" im Menü oben, um loszulegen.
      <br/>
      Danke nochmal, wir schätzen eure Teilnahme sehr!
      {/* This tool has been built by a team of researchers at the Zurich University of Applied Sciences, the University of Zurich and the University of St. Gallen.
      Learn more about us here: <a href="https://fair-ai.ch" target="_blank">https://fair-ai.ch</a> */}
    </div>
  );
}

export default About;