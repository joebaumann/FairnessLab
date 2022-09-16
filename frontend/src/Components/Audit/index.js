import './Audit.css';
import React, {useState} from 'react';
import Header from '../Header';
import DatasetSelector from '../DatasetSelector';
import ParetoPlot from '../ParetoPlot';
import SelectedPointsTable from '../SelectedPointsTable';
import ScoreDistribution from '../ScoreDistribution';
import SubjectsUtility from '../SubjectsUtility';

function Audit() {
  const [datasetSelection, setDatasetSelection] = useState('COMPAS');
  const [justifier, setJustifier] = useState('no_justifier');
  // the datasetSelectionCounter is incremented every time the datasetSelection or the justifier changes
  // this makes sure that the decision subject utilities are recalculated after the justifier has been applied to the dataset
  const [datasetSelectionCounter, setDatasetSelectionCounter] = useState(0);
  const [group1, setGroup1] = useState('male');
  const [group2, setGroup2] = useState('female');
  const [decisionMakerCurrency, setDecisionMakerCurrency] = useState('CHF');
  const [subjectsCurrency, setSubjectsCurrency] = useState('CHF');
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [idOfSelectedPoints, setIdOfSelectedPoints] = useState({});
  const [incrementalSelectionId, setIncrementalSelectionId] = useState(1);
  const [numThresholds, setNumThresholds] = useState(11)
  const [subjectsUtility, setSubjectsUtility] = useState([])
  const [fairnessScores, setFairnessScores] = useState([])
  const [evaluationOfD, setEvaluationOfD] = useState([0, 0]);
  const [thresholdTuples, setThresholdTuples] = useState([]);
  const [colors, setColors] = useState(Array(numThresholds * numThresholds).fill('#4e87ad'));
  const [scores, setScores] = useState({'scores_group1': [], 'scores_group2': []});
  const [y, setY] = useState({'y_group1': [], 'y_group2': []});
  const [d, setD] = useState({'d_group1': [], 'd_group2': []});

  return(
    <div className="Audit">
      <Header title="Audit"/>
      <div className="Audit-Content">
        <DatasetSelector datasetSelection={datasetSelection} setDatasetSelection={setDatasetSelection} setScores={setScores} setY={setY} setD={setD} justifier={justifier} datasetSelectionCounter={datasetSelectionCounter} setDatasetSelectionCounter={setDatasetSelectionCounter} />
        <ParetoPlot datasetSelection={datasetSelection} scores={[scores["scores_group1"], scores["scores_group2"]]} y={[y["y_group1"], y["y_group2"]]} d={[d["d_group1"], d["d_group2"]]} group1={group1} setGroup1={setGroup1} group2={group2} setGroup2={setGroup2} numThresholds={numThresholds} setNumThresholds={setNumThresholds} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} idOfSelectedPoints={idOfSelectedPoints} setIdOfSelectedPoints={setIdOfSelectedPoints} incrementalSelectionId={incrementalSelectionId} setIncrementalSelectionId={setIncrementalSelectionId} colors={colors} setColors={setColors} setSubjectsUtility={setSubjectsUtility} fairnessScores={fairnessScores} setFairnessScores={setFairnessScores} thresholdTuples={thresholdTuples} setThresholdTuples={setThresholdTuples} decisionMakerCurrency={decisionMakerCurrency} setDecisionMakerCurrency={setDecisionMakerCurrency} subjectsCurrency={subjectsCurrency} setSubjectsCurrency={setSubjectsCurrency} justifier={justifier} setJustifier={setJustifier} datasetSelectionCounter={datasetSelectionCounter} evaluationOfD={evaluationOfD} setEvaluationOfD={setEvaluationOfD} />
        <SelectedPointsTable selectedPoints={selectedPoints} idOfSelectedPoints={idOfSelectedPoints} decisionMakerCurrency={decisionMakerCurrency} subjectsCurrency={subjectsCurrency} labels={[group1, group2]} />
        <ScoreDistribution scores={[scores["scores_group1"], scores["scores_group2"]]} y={[y["y_group1"], y["y_group2"]]} selectedPoints={selectedPoints} labels={[group1, group2]} colors={colors} thresholdTuples={thresholdTuples} />
        <SubjectsUtility subjectsUtility={subjectsUtility} fairnessScores={fairnessScores} group1={group1} group2={group2} selectedPoints={selectedPoints} colors={colors} idOfSelectedPoints={idOfSelectedPoints} evaluationOfD={evaluationOfD} />
      </div>
    </div>
  )
}
  
export default Audit;