import React from "react";
import './Data.css';
import ComparisonPlot from '../ComparisonPlot';

export function Data() {
  return (
    <div className="Data">
      <h1>Select dataset</h1>
      <ComparisonPlot labels={["Women", "Men"]} data={[12, 10]} ylabel={'FPR'}/>
    </div>
  );
}

export default Data;