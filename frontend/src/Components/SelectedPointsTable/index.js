import React, {useState, useEffect} from 'react';
import './SelectedPointsTable.css';


function SelectedPointsTable({selectedPoints, idOfSelectedPoints, decisionMakerCurrency, subjectsUtility, labels}) {

  const tableDate = Object.values(idOfSelectedPoints).sort(function(a, b){
    return a.id-b.id
  })
    
  function renderTableData() {
    
    return tableDate.map((tableRow, index) => {
      const { id, thresholdGroup0, thresholdGroup1, decisionMakerUtility, fairnessScore } = tableRow //destructuring
      return (
          <tr key={id}>
            <td>{id}</td>
            <td>{labels[0]}: {thresholdGroup0.toFixed(2)}; {labels[1]}: {thresholdGroup1.toFixed(2)}</td>
            <td>{decisionMakerUtility} {decisionMakerCurrency}</td>
            <td>{fairnessScore.toFixed(4)}</td>
          </tr>
      )
    })
  }

  function renderTable() {
    if (selectedPoints.length === 0) {
      return (<h4 id="nothingSelected">Nothing selected yet.</h4>)
    }
    else {
      return (
        <table id='selectedPoints'>
        <tbody>
          <tr>
            <th>Selection</th>
            <th>Thresholds</th>
            <th>Decision maker's utility</th>
            <th>Fairness score</th>
          </tr>
          {renderTableData()}
        </tbody>
        </table>
        )
      }
  }

  return (
    <div>
        <h1 id='title'>Selected Decision Rules</h1>
        {renderTable()}
    </div>
  )
}



export default SelectedPointsTable;