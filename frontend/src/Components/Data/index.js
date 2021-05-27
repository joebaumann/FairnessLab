import React from "react";
import './Data.css';

export function Data() {
  return (
    <div className="Data">
      <h1>Select dataset</h1>
      The idea would be that the user selects a dataset here, which is written in the global state (see ReactRedux) and then used in both use cases.
    </div>
  );
}

export default Data;