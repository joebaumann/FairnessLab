import './FairnessLabPareto.css';
import React, {useState} from 'react';
import Header from '../Header';
import ScoreDistribution from '../ScoreDistribution';
import ParetoPlot from '../ParetoPlot';
import scores from '../../data_static/compas/scores.json';

function FairnessLabPareto() {
  const [group1, setGroup1] = useState('Women and non-binary people');
  const [group2, setGroup2] = useState('Men');
  const [selectedPoints, setSelectedPoints] = useState([]);
  return(
    <div className="FairnessLabPareto">
      <Header title="Fairness Lab: Pareto"/>
      <ParetoPlot scores={[scores["scores_group1"], scores["scores_group2"]]} group1={group1} setGroup1={setGroup1} group2={group2} setGroup2={setGroup2} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} />
      <ScoreDistribution scores={[scores["scores_group1"], scores["scores_group2"]]} selectedPoints={selectedPoints} labels={[group1, group2]}/>
    </div>
  )
}
  
export default FairnessLabPareto;