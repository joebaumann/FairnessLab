import './FairnessLabPareto.css';
import React, {useState} from 'react';
import Header from '../Header';
import DatasetSelector from '../DatasetSelector';
import ParetoPlot from '../ParetoPlot';
import ScoreDistribution from '../ScoreDistribution';
import SubjectsUtility from '../SubjectsUtility';
import compas_scores from '../../data_static/compas/scores.json';
import compas_y from '../../data_static/compas/y.json';

function FairnessLabPareto() {
  const [group1, setGroup1] = useState('men');
  const [group2, setGroup2] = useState('women and non-binary people');
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [numThresholds, setNumThresholds] = useState(11)
  const [subjectsUtility, setSubjectsUtility] = useState([])
  const [fairnessScores, setFairnessScores] = useState([])
  const [thresholdTuples, setThresholdTuples] = useState([]);
  const [colors, setColors] = useState(Array(numThresholds * numThresholds).fill('#4e87ad'));
  const [scores, setScores] = useState(compas_scores);
  const [y, setY] = useState(compas_y);

  return(
    <div className="FairnessLabPareto">
      <Header title="Fairness Lab: Pareto"/>
      <div className="FairnessLabPareto-Content">
        <DatasetSelector setScores={setScores} setY={setY}/>
        <ParetoPlot scores={[scores["scores_group1"], scores["scores_group2"]]} y={[y["y_group1"], y["y_group2"]]} group1={group1} setGroup1={setGroup1} group2={group2} setGroup2={setGroup2} numThresholds={numThresholds} setNumThresholds={setNumThresholds} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} colors={colors} setColors={setColors} setSubjectsUtility={setSubjectsUtility} fairnessScores={fairnessScores} setFairnessScores={setFairnessScores} thresholdTuples={thresholdTuples} setThresholdTuples={setThresholdTuples} />
        <ScoreDistribution scores={[scores["scores_group1"], scores["scores_group2"]]} y={[y["y_group1"], y["y_group2"]]} selectedPoints={selectedPoints} labels={[group1, group2]} colors={colors} thresholdTuples={thresholdTuples} />
        <SubjectsUtility subjectsUtility={subjectsUtility} fairnessScores={fairnessScores} group1={group1} group2={group2} selectedPoints={selectedPoints} colors={colors} />
      </div>
    </div>
  )
}
  
export default FairnessLabPareto;