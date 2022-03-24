import './DatasetSelector.css';
import React, {useState, useEffect} from 'react';
import compas_scores from '../../data_static/compas/scores.json';
import compas_y from '../../data_static/compas/y.json';
// import credit_scores from '../../data_static/credit/scores.json';
// import credit_y from '../../data_static/credit/y.json';
// import hr_scores from '../../data_static/hr/scores.json';
// import hr_y from '../../data_static/hr/y.json';

function DatasetSelector({setScores, setY}) {
    const datasets = {
        'Credit': {
        'scores': compas_y,
        'y': compas_y
        },
        'HR': {
        'scores': compas_y,
        'y': compas_y
        },
        'COMPAS': {
        'scores': compas_scores,
        'y': compas_y
        }
    }

    const [datasetSelection, setDatasetSelection] = useState('COMPAS');

    useEffect(() => {
        setScores(datasets[datasetSelection]['scores'])
        setY(datasets[datasetSelection]['y'])
    }, [datasetSelection]);

    return(
        <div className="DatasetSelector">
        <h1>Dataset</h1>
        <label htmlFor="datasetSelection">Choose a dataset:</label>
        <select name="datasetSelection" id="pattern" value={datasetSelection} onChange={(e) => setDatasetSelection(e.target.value)}>
            <option value="Credit">Credit</option>
            <option value="HR">HR</option>
            <option value="COMPAS">COMPAS</option>
        </select>
        </div>
    )
}
  
export default DatasetSelector;