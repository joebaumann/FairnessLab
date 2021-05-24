import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>[Welcome to the Fairness Lab :)]</h1>
      <nav>
        <ul>
          <li>
            <Link to="audit">Fairness Lab: Audit</Link>
          </li>
          <li>
            <Link to="makefair">Fairness Lab: make fair</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;