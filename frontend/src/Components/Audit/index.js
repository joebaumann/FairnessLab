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
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [idOfSelectedPoints, setIdOfSelectedPoints] = useState({});
  const [incrementalSelectionId, setIncrementalSelectionId] = useState(1);
  const [evaluationOfD, setEvaluationOfD] = useState([0, 0]);
  const [colors, setColors] = useState(Array(11 * 11).fill('#4e87ad'));

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
        <DatasetSelector datasetSelectionCounter={datasetSelectionCounter} setDatasetSelectionCounter={setDatasetSelectionCounter} />
        <Terminology/>
        <Configuration isDemo={props.match.params.demo}/>
        <h1>Audit</h1>
        <SubjectsUtility selectedPoints={selectedPoints} idOfSelectedPoints={idOfSelectedPoints} colors={colors} evaluationOfD={evaluationOfD} />
        <ParetoPlot isDemo={props.match.params.demo} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} idOfSelectedPoints={idOfSelectedPoints} setIdOfSelectedPoints={setIdOfSelectedPoints} incrementalSelectionId={incrementalSelectionId} setIncrementalSelectionId={setIncrementalSelectionId} colors={colors} setColors={setColors} datasetSelectionCounter={datasetSelectionCounter} evaluationOfD={evaluationOfD} setEvaluationOfD={setEvaluationOfD} />
        <SelectedPointsTable selectedPoints={selectedPoints} idOfSelectedPoints={idOfSelectedPoints} evaluationOfD={evaluationOfD} />
        <ScoreDistribution selectedPoints={selectedPoints} colors={colors} />
      </div>
    </div>
  )
}
  
export default Audit;