import './FairnessLabPareto.css';
import React, {useState} from 'react';
import Header from '../Header';
import ScoreDistribution from '../ScoreDistribution';
import ParetoPlot from '../ParetoPlot';
import SubjectsUtility from '../SubjectsUtility';
import scores from '../../data_static/compas/scores.json';
import y from '../../data_static/compas/y.json';

function FairnessLabPareto() {
  const [group1, setGroup1] = useState('men');
  const [group2, setGroup2] = useState('women and non-binary people');
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [numThresholds, setNumThresholds] = useState(11)
  const [subjectsUtility, setSubjectsUtility] = useState([])
  const [fairnessScores, setFairnessScores] = useState([])
  const [colors, setColors] = useState(Array(numThresholds * numThresholds).fill('#4e87ad'));

  return(
    <div className="FairnessLabPareto">
      <Header title="Fairness Lab: Pareto"/>
      <ParetoPlot scores={[scores["scores_group1"], scores["scores_group2"]]} y={[y["y_group1"], y["y_group2"]]} group1={group1} setGroup1={setGroup1} group2={group2} setGroup2={setGroup2} numThresholds={numThresholds} setNumThresholds={setNumThresholds} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} colors={colors} setColors={setColors} subjectsUtility={subjectsUtility} setSubjectsUtility={setSubjectsUtility} fairnessScores={fairnessScores} setFairnessScores={setFairnessScores} />
      <ScoreDistribution scores={[scores["scores_group1"], scores["scores_group2"]]} y={[y["y_group1"], y["y_group2"]]} selectedPoints={selectedPoints} labels={[group1, group2]} colors={colors}/>
      <SubjectsUtility subjectsUtility={subjectsUtility} fairnessScores={fairnessScores} group1={group1} group2={group2} selectedPoints={selectedPoints} colors={colors} />
    </div>
  )
}
  
export default FairnessLabPareto;