import React from "react";
import Header from '../Header';

function About() {
  return (
    <div>
      <Header title="About"/>
      This tool has been built by a team of researchers at the Zurich University of Applied Sciences, the University of Zurich and the University of St. Gallen.
      Learn more about us here: <a href="https://fair-ai.ch" target="_blank">https://fair-ai.ch</a>
    </div>
  );
}

export default About;