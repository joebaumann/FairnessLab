import './FairnessLabPareto.css';
import React, {useState} from 'react';
import Header from '../Header';
import ScoreDistribution from '../ScoreDistribution';
import scores from '../../data_static/compas/scores.json';
import ParetoPlot from '../ParetoPlot';

function FairnessLabPareto() {
  const [group1, setGroup1] = useState('Women and non-binary people');
  const [group2, setGroup2] = useState('Men');
  return(
    <div className="FairnessLabPareto">
      <Header title="Fairness Lab: Pareto"/>
      <ParetoPlot scores={[scores["scores_group1"], scores["scores_group2"]]} group1={group1} setGroup1={setGroup1} group2={group2} setGroup2={setGroup2}/>
      <ScoreDistribution scores={[scores["scores_group1"], scores["scores_group2"]]} thresholds={[0.2, 0.5]} labels={[group1, group2]}/>
    </div>
  )
}
  
export default FairnessLabPareto;