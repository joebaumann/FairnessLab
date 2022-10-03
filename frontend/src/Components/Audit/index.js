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
  // the datasetSelectionCounter is incremented every time the datasetSelection or the justifier changes
  // this makes sure that the decision subject utilities are recalculated after the justifier has been applied to the dataset
  const [datasetSelectionCounter, setDatasetSelectionCounter] = useState(0);
  const [colors, setColors] = useState(Array(11 * 11).fill('#4e87ad'));

  return(
    <div className="Audit">
      <Header title="Audit"/>
      <div className="Content">
        <DatasetSelector demo={props.match.params.demo} datasetSelectionCounter={datasetSelectionCounter} setDatasetSelectionCounter={setDatasetSelectionCounter} />
        <Terminology/>
        <Configuration demo={props.match.params.demo}/>
        <h1>Audit</h1>
        <SubjectsUtility colors={colors} />
        <ParetoPlot demo={props.match.params.demo} colors={colors} setColors={setColors} datasetSelectionCounter={datasetSelectionCounter} />
        <SelectedPointsTable />
        <ScoreDistribution colors={colors} />
      </div>
    </div>
  )
}
  
export default Audit;