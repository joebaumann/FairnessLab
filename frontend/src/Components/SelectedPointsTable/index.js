import React from 'react';
import './SelectedPointsTable.css';


function SelectedPointsTable({selectedPoints, idOfSelectedPoints, decisionMakerCurrency, decisionMakerUtility, fairnessScores, thresholdTuples, evaluationOfD, labels}) {

  function renderTableData() {
    
    return selectedPoints.map(i => {
      const id = idOfSelectedPoints[i]
      const thresholdGroup0 = i===-1? undefined : thresholdTuples[i][0]
      const thresholdGroup1 = i===-1? undefined : thresholdTuples[i][1]
      const decisionMaker = i===-1? evaluationOfD[1] : decisionMakerUtility[i]
      const fairnessScore = i===-1? evaluationOfD[0] : fairnessScores[i]
      console.log('fairnessScore', fairnessScore)
      return (
        <tr key={id}>
          <td>{id}</td>
          {thresholdGroup0 !== undefined ?
            <td>{labels[0]}: {thresholdGroup0.toFixed(2)}; {labels[1]}: {thresholdGroup1.toFixed(2)}</td>
            : <td>Decision rule from dataset</td>
          }
          <td>{decisionMaker} {decisionMakerCurrency}</td>
          <td>{fairnessScore?.toFixed(4)}</td>
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
        <h2 id='title'>Selected Decision Rules</h2>
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
    </div>
  )
}



export default SelectedPointsTable;