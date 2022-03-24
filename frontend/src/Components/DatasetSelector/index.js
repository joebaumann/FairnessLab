import './DatasetSelector.css';
import React, {useState, useEffect} from 'react';
import compas_scores from '../../data_static/compas/scores.json';
import compas_y from '../../data_static/compas/y.json';
// datasets used for the AMLD@EPFL workshop
import credit_lending_scores from '../../data_static/credit_lending/scores.json';
import credit_lending_y from '../../data_static/credit_lending/y.json';
import algorithmic_hiring_scores from '../../data_static/algorithmic_hiring/scores.json';
import algorithmic_hiring_y from '../../data_static/algorithmic_hiring/y.json';

function DatasetSelector({setScores, setY}) {
    const datasets = {
        'Credit Lending': {
        'scores': credit_lending_scores,
        'y': credit_lending_y
        },
        'Algorithmic Hiring': {
        'scores': algorithmic_hiring_scores,
        'y': algorithmic_hiring_y
        },
        'COMPAS': {
        'scores': compas_scores,
        'y': compas_y
        }
    }

    const [datasetSelection, setDatasetSelection] = useState('Credit Lending');

    useEffect(() => {
        setScores(datasets[datasetSelection]['scores'])
        setY(datasets[datasetSelection]['y'])
    }, [datasetSelection]);

    return(
        <div className="DatasetSelector">
        <h1>Dataset</h1>
        <label htmlFor="datasetSelection">Choose a dataset:</label>
        <select name="datasetSelection" id="pattern" value={datasetSelection} onChange={(e) => setDatasetSelection(e.target.value)}>
            <option value="Credit Lending">Credit Lending</option>
            <option value="Algorithmic Hiring">Algorithmic Hiring</option>
            <option value="COMPAS">COMPAS</option>
        </select>
        </div>
    )
}
  
export default DatasetSelector;