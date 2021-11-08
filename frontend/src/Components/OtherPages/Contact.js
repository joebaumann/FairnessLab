import React from "react";
import Header from '../Header';
import './Pages.css'

export function Contact() {
  return (
    <div>
      <Header title="Contact"/>
      <p>
        For questions, comments or feedback on this tool, please contact the developers: Corinna Hertweck [<a href="mailto:corinna.hertweck@uzh.ch">corinna.hertweck@uzh.ch</a>] and Joachim Baumann [<a href="mailto:baumann@ifi.uzh.ch">baumann@ifi.uzh.ch</a>].
      </p>
    </div>
  );
}

export default Contact;