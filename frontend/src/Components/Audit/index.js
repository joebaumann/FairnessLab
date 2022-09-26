import './Audit.css';
import React, {useState} from 'react';
import Header from '../Header';
import DatasetSelector from '../DatasetSelector';
import ParetoPlot from '../ParetoPlot';
import SelectedPointsTable from '../SelectedPointsTable';
import ScoreDistribution from '../ScoreDistribution';
import SubjectsUtility from '../SubjectsUtility';

function Audit(props) {
  // loads the state for a specific demo if the audit page was accessed from the compas case study
  
  const [datasetSelection, setDatasetSelection] = useState('COMPAS');
  const [justifier, setJustifier] = useState(() => {
    if (props.match.params.demo === "compasaudit1") {
      return 'y_0'
    }
    else if (props.match.params.demo === "compasaudit2") {
      return 'y_0'
    }
    else {
      return 'no_justifier';
    }
  });
  // the datasetSelectionCounter is incremented every time the datasetSelection or the justifier changes
  // this makes sure that the decision subject utilities are recalculated after the justifier has been applied to the dataset
  const [datasetSelectionCounter, setDatasetSelectionCounter] = useState(0);
  const [group1, setGroup1] = useState('male');
  const [group2, setGroup2] = useState('female');
  const [d0description, setd0description] = useState('negative decision (D=0)');
  const [d1description, setd1description] = useState('positive decision (D=1)');
  const [y0description, sety0description] = useState('of type Y=0');
  const [y1description, sety1description] = useState('of type Y=1');
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
  const [filteredData, setFilteredData] = useState({'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]});
  const [unfilteredData, setUnfilteredData] = useState({'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]})

  return(
    <div className="Audit">
      { props.match.params.demo === 'compasaudit1' ?
        <Header title="Audit: COMPAS Case Study Audit 1 (replication of ProPublica)"/>
        :
        <>
        { props.match.params.demo === 'compasaudit1' ?
          <Header title="Audit: COMPAS Case Study Audit 2 (new insights)"/>
          :
          <Header title="Audit"/>
        }
        </>
      }
      <div className="Content">
        <DatasetSelector datasetSelection={datasetSelection} setDatasetSelection={setDatasetSelection} setFilteredData={setFilteredData} setUnfilteredData={setUnfilteredData} justifier={justifier} datasetSelectionCounter={datasetSelectionCounter} setDatasetSelectionCounter={setDatasetSelectionCounter} />
        <ParetoPlot isDemo={props.match.params.demo} datasetSelection={datasetSelection} filteredData={filteredData} unfilteredData={unfilteredData} group1={group1} setGroup1={setGroup1} group2={group2} setGroup2={setGroup2} d0description={d0description} setd0description={setd0description} d1description={d1description} setd1description={setd1description} y0description={y0description} sety0description={sety0description} y1description={y1description} sety1description={sety1description} numThresholds={numThresholds} setNumThresholds={setNumThresholds} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} idOfSelectedPoints={idOfSelectedPoints} setIdOfSelectedPoints={setIdOfSelectedPoints} incrementalSelectionId={incrementalSelectionId} setIncrementalSelectionId={setIncrementalSelectionId} colors={colors} setColors={setColors} setSubjectsUtility={setSubjectsUtility} fairnessScores={fairnessScores} setFairnessScores={setFairnessScores} thresholdTuples={thresholdTuples} setThresholdTuples={setThresholdTuples} decisionMakerCurrency={decisionMakerCurrency} setDecisionMakerCurrency={setDecisionMakerCurrency} subjectsCurrency={subjectsCurrency} setSubjectsCurrency={setSubjectsCurrency} justifier={justifier} setJustifier={setJustifier} datasetSelectionCounter={datasetSelectionCounter} evaluationOfD={evaluationOfD} setEvaluationOfD={setEvaluationOfD} />
        <SelectedPointsTable selectedPoints={selectedPoints} idOfSelectedPoints={idOfSelectedPoints} decisionMakerCurrency={decisionMakerCurrency} subjectsCurrency={subjectsCurrency} labels={[group1, group2]} />
        <ScoreDistribution unfilteredData={unfilteredData} selectedPoints={selectedPoints} labels={[group1, group2]} colors={colors} thresholdTuples={thresholdTuples} />
        <SubjectsUtility subjectsUtility={subjectsUtility} fairnessScores={fairnessScores} group1={group1} group2={group2} selectedPoints={selectedPoints} colors={colors} idOfSelectedPoints={idOfSelectedPoints} evaluationOfD={evaluationOfD} />
      </div>
    </div>
  )
}
  
export default Audit;