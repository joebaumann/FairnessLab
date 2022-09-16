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
  const [filteredScores, setFilteredScores] = useState([[],[]]);
  const [filteredY, setFilteredY] = useState([[], []]);
  const [filteredD, setFilteredD] = useState([[],[]]);

  return(
    <div className="Audit">
      <Header title="Audit"/>
      <div className="Audit-Content">
        <DatasetSelector datasetSelection={datasetSelection} setDatasetSelection={setDatasetSelection} setFilteredScores={setFilteredScores} setFilteredY={setFilteredY} setFilteredD={setFilteredD} justifier={justifier} datasetSelectionCounter={datasetSelectionCounter} setDatasetSelectionCounter={setDatasetSelectionCounter} />
        <ParetoPlot datasetSelection={datasetSelection} filteredScores={filteredScores} filteredY={filteredY} filteredD={filteredD} group1={group1} setGroup1={setGroup1} group2={group2} setGroup2={setGroup2} numThresholds={numThresholds} setNumThresholds={setNumThresholds} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} idOfSelectedPoints={idOfSelectedPoints} setIdOfSelectedPoints={setIdOfSelectedPoints} incrementalSelectionId={incrementalSelectionId} setIncrementalSelectionId={setIncrementalSelectionId} colors={colors} setColors={setColors} setSubjectsUtility={setSubjectsUtility} fairnessScores={fairnessScores} setFairnessScores={setFairnessScores} thresholdTuples={thresholdTuples} setThresholdTuples={setThresholdTuples} decisionMakerCurrency={decisionMakerCurrency} setDecisionMakerCurrency={setDecisionMakerCurrency} subjectsCurrency={subjectsCurrency} setSubjectsCurrency={setSubjectsCurrency} justifier={justifier} setJustifier={setJustifier} datasetSelectionCounter={datasetSelectionCounter} evaluationOfD={evaluationOfD} setEvaluationOfD={setEvaluationOfD} />
        <SelectedPointsTable selectedPoints={selectedPoints} idOfSelectedPoints={idOfSelectedPoints} decisionMakerCurrency={decisionMakerCurrency} subjectsCurrency={subjectsCurrency} labels={[group1, group2]} />
        <ScoreDistribution scores={filteredScores} y={filteredY} selectedPoints={selectedPoints} labels={[group1, group2]} colors={colors} thresholdTuples={thresholdTuples} />
        <SubjectsUtility subjectsUtility={subjectsUtility} fairnessScores={fairnessScores} group1={group1} group2={group2} selectedPoints={selectedPoints} colors={colors} idOfSelectedPoints={idOfSelectedPoints} evaluationOfD={evaluationOfD} />
      </div>
    </div>
  )
}
  
export default Audit;