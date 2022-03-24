import './FairnessLabPareto.css';
import React, {useState} from 'react';
import Header from '../Header';
import DatasetSelector from '../DatasetSelector';
import ParetoPlot from '../ParetoPlot';
import SelectedPointsTable from '../SelectedPointsTable';
import ScoreDistribution from '../ScoreDistribution';
import SubjectsUtility from '../SubjectsUtility';
import credit_lending_scores from '../../data_static/credit_lending/scores.json';
import credit_lending_y from '../../data_static/credit_lending/y.json';

function FairnessLabPareto() {
  const [datasetSelection, setDatasetSelection] = useState('Credit Lending');
  const [group1, setGroup1] = useState('men');
  const [group2, setGroup2] = useState('women and non-binary people');
  const [decisionMakerCurrency, setDecisionMakerCurrency] = useState('CHF');
  const [subjectsCurrency, setSubjectsCurrency] = useState('CHF');
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [idOfSelectedPoints, setIdOfSelectedPoints] = useState({});
  const [incrementalSelectionId, setIncrementalSelectionId] = useState(1);
  const [numThresholds, setNumThresholds] = useState(11)
  const [subjectsUtility, setSubjectsUtility] = useState([])
  const [fairnessScores, setFairnessScores] = useState([])
  const [thresholdTuples, setThresholdTuples] = useState([]);
  const [colors, setColors] = useState(Array(numThresholds * numThresholds).fill('#4e87ad'));
  const [scores, setScores] = useState(credit_lending_scores);
  const [y, setY] = useState(credit_lending_y);

  return(
    <div className="FairnessLabPareto">
      <Header title="Fairness Lab: Pareto"/>
      <div className="FairnessLabPareto-Content">
        <DatasetSelector datasetSelection={datasetSelection} setDatasetSelection={setDatasetSelection} setScores={setScores} setY={setY}/>
        <ParetoPlot datasetSelection={datasetSelection} scores={[scores["scores_group1"], scores["scores_group2"]]} y={[y["y_group1"], y["y_group2"]]} group1={group1} setGroup1={setGroup1} group2={group2} setGroup2={setGroup2} numThresholds={numThresholds} setNumThresholds={setNumThresholds} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} idOfSelectedPoints={idOfSelectedPoints} setIdOfSelectedPoints={setIdOfSelectedPoints} incrementalSelectionId={incrementalSelectionId} setIncrementalSelectionId={setIncrementalSelectionId} colors={colors} setColors={setColors} setSubjectsUtility={setSubjectsUtility} fairnessScores={fairnessScores} setFairnessScores={setFairnessScores} thresholdTuples={thresholdTuples} setThresholdTuples={setThresholdTuples} decisionMakerCurrency={decisionMakerCurrency} setDecisionMakerCurrency={setDecisionMakerCurrency} subjectsCurrency={subjectsCurrency} setSubjectsCurrency={setSubjectsCurrency} />
        <SelectedPointsTable selectedPoints={selectedPoints} idOfSelectedPoints={idOfSelectedPoints} decisionMakerCurrency={decisionMakerCurrency} subjectsCurrency={subjectsCurrency} labels={[group1, group2]} />
        <ScoreDistribution scores={[scores["scores_group1"], scores["scores_group2"]]} y={[y["y_group1"], y["y_group2"]]} selectedPoints={selectedPoints} labels={[group1, group2]} colors={colors} thresholdTuples={thresholdTuples} />
        <SubjectsUtility subjectsUtility={subjectsUtility} fairnessScores={fairnessScores} group1={group1} group2={group2} selectedPoints={selectedPoints} colors={colors} idOfSelectedPoints={idOfSelectedPoints} />
      </div>
    </div>
  )
}
  
export default FairnessLabPareto;