import './Audit.css';
import React, {useState} from 'react';
import Header from '../Header';
import DatasetSelector from '../DatasetSelector';
import Terminology from '../Terminology';
import Configuration from '../Configuration';
import ParetoPlot from '../ParetoPlot';
import SelectedPointsTable from '../SelectedPointsTable';
import ScoreDistribution from '../ScoreDistribution';
import SubjectsUtility from '../SubjectsUtility';

function Audit(props) {
  // loads the state for a specific demo if the audit page was accessed from the compas case study
  
  // the datasetSelectionCounter is incremented every time the datasetSelection or the justifier changes
  // this makes sure that the decision subject utilities are recalculated after the justifier has been applied to the dataset
  const [datasetSelectionCounter, setDatasetSelectionCounter] = useState(0);
  const [decisionMakerUtility, setDecisionMakerUtility] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [idOfSelectedPoints, setIdOfSelectedPoints] = useState({});
  const [incrementalSelectionId, setIncrementalSelectionId] = useState(1);
  const [numThresholds, setNumThresholds] = useState(11)
  const [subjectsUtility, setSubjectsUtility] = useState([])
  const [fairnessScores, setFairnessScores] = useState([])
  const [evaluationOfD, setEvaluationOfD] = useState([0, 0]);
  const [thresholdTuples, setThresholdTuples] = useState([]);
  const [colors, setColors] = useState(Array(numThresholds * numThresholds).fill('#4e87ad'));
  const [filteredData, setFilteredData] = useState({'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]});
  const [unfilteredData, setUnfilteredData] = useState({'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]})

  return(
    <div className="Audit">
      { props.match.params.demo === 'compasaudit1' ?
        <Header title="Audit: COMPAS Case Study Audit 1 (replication of <a href='https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing'  target='_blank'>ProPublica</a>)"/>
        :
        <>
        { props.match.params.demo === 'compasaudit2' ?
          <Header title="Audit: COMPAS Case Study Audit 2 (new insights)"/>
          :
          <Header title="Audit"/>
        }
        </>
      }
      <div className="Content">
        <DatasetSelector setFilteredData={setFilteredData} setUnfilteredData={setUnfilteredData} datasetSelectionCounter={datasetSelectionCounter} setDatasetSelectionCounter={setDatasetSelectionCounter} />
        <Terminology/>
        <Configuration isDemo={props.match.params.demo}/>
        <SubjectsUtility subjectsUtility={subjectsUtility} fairnessScores={fairnessScores} selectedPoints={selectedPoints} colors={colors} idOfSelectedPoints={idOfSelectedPoints} evaluationOfD={evaluationOfD} />
        <ParetoPlot isDemo={props.match.params.demo} filteredData={filteredData} unfilteredData={unfilteredData} numThresholds={numThresholds} setNumThresholds={setNumThresholds} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} idOfSelectedPoints={idOfSelectedPoints} setIdOfSelectedPoints={setIdOfSelectedPoints} incrementalSelectionId={incrementalSelectionId} setIncrementalSelectionId={setIncrementalSelectionId} colors={colors} setColors={setColors} setSubjectsUtility={setSubjectsUtility} decisionMakerUtility={decisionMakerUtility} setDecisionMakerUtility={setDecisionMakerUtility} fairnessScores={fairnessScores} setFairnessScores={setFairnessScores} thresholdTuples={thresholdTuples} setThresholdTuples={setThresholdTuples} datasetSelectionCounter={datasetSelectionCounter} evaluationOfD={evaluationOfD} setEvaluationOfD={setEvaluationOfD} />
        <SelectedPointsTable selectedPoints={selectedPoints} idOfSelectedPoints={idOfSelectedPoints} decisionMakerUtility={decisionMakerUtility} fairnessScores={fairnessScores} thresholdTuples={thresholdTuples} evaluationOfD={evaluationOfD} />
        <ScoreDistribution unfilteredData={unfilteredData} selectedPoints={selectedPoints} colors={colors} thresholdTuples={thresholdTuples} />
      </div>
    </div>
  )
}
  
export default Audit;