import './Audit.css';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header';
import DatasetSelector from '../DatasetSelector';
import Terminology from '../Terminology';
import Configuration from '../Configuration';
import ParetoPlot from '../ParetoPlot';
import SelectedPointsTable from '../SelectedPointsTable';
import ScoreDistribution from '../ScoreDistribution';
import SubjectsUtility from '../SubjectsUtility';
import { getFairnessScoreDescription } from '../../store/fairnessScore';

function Audit(props) {
  // the datasetSelectionCounter is incremented every time the datasetSelection or the justifier changes
  // this makes sure that the decision subject utilities are recalculated after the justifier has been applied to the dataset
  const [datasetSelectionCounter, setDatasetSelectionCounter] = useState(0);
  const [colors, setColors] = useState(Array(11 * 11).fill('#4e87ad'));
  const fairnessScoreDescription = useSelector(getFairnessScoreDescription);

  return(
    <div className="Audit">
      <Header title="Audit"/>
      <div className="Content">
        <DatasetSelector datasetSelectionCounter={datasetSelectionCounter} setDatasetSelectionCounter={setDatasetSelectionCounter} />
        <Terminology/>
        <Configuration/>
        <h1>Audit</h1>
        <h2>Resulting fairness metric</h2>
        In the audit, we will use the fairness metric that you defined with your inputs above. Specifically, we will look at the following fairness metric:
        <div><i>{fairnessScoreDescription}</i></div>
        <SubjectsUtility colors={colors} />
        <ParetoPlot colors={colors} setColors={setColors} datasetSelectionCounter={datasetSelectionCounter} />
        <SelectedPointsTable />
        <ScoreDistribution colors={colors} />
      </div>
    </div>
  )
}
  
export default Audit;