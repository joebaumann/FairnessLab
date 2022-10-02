import React from 'react';
import { useSelector } from 'react-redux';
import './SelectedPointsTable.css';
import { getGroup1, getGroup2 } from '../../store/fairnessScore';
import { getDecisionMakerCurrency } from '../../store/decisionMaker';
import { getDecisionMakerUtility, getFairnessScores, getThresholdTuples } from '../../store/paretoPlot';


function SelectedPointsTable({selectedPoints, idOfSelectedPoints, evaluationOfD}) {
  const group1 = useSelector(getGroup1);
  const group2 = useSelector(getGroup2);
  const decisionMakerCurrency = useSelector(getDecisionMakerCurrency);
  const fairnessScores = useSelector(getFairnessScores);
  const decisionMakerUtility = useSelector(getDecisionMakerUtility);
  const thresholdTuples = useSelector(getThresholdTuples);
  
  function renderTableData() {
    
    return selectedPoints.map(i => {
      const id = idOfSelectedPoints[i]
      const thresholdGroup0 = i===-1? undefined : thresholdTuples[i][0]
      const thresholdGroup1 = i===-1? undefined : thresholdTuples[i][1]
      const decisionMaker = i===-1? evaluationOfD[1] : decisionMakerUtility[i]
      const fairnessScore = i===-1? evaluationOfD[0] : fairnessScores[i]
      return (
        <tr key={id}>
          <td>{id}</td>
          {thresholdGroup0 !== undefined ?
            <td>{group1}: {thresholdGroup0.toFixed(2)}; {group2}: {thresholdGroup1.toFixed(2)}</td>
            : <td>Decision rule from dataset</td>
          }
          <td>{decisionMaker} {decisionMakerCurrency}</td>
          <td>{fairnessScore?.toFixed(4)}</td>
        </tr>
      )
    })
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