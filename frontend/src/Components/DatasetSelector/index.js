import './DatasetSelector.css';
import React, {useState, useEffect} from 'react';
import compas_scores from '../../data_static/compas/scores.json';
import compas_y from '../../data_static/compas/y.json';
// datasets used for the AMLD@EPFL workshop
import credit_lending_scores from '../../data_static/credit_lending/scores.json';
import credit_lending_y from '../../data_static/credit_lending/y.json';
import algorithmic_hiring_scores from '../../data_static/algorithmic_hiring/scores.json';
import algorithmic_hiring_y from '../../data_static/algorithmic_hiring/y.json';

function DatasetSelector({fileID, setFileID, datasetSelection, setDatasetSelection, setScores, setY}) {
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

	const [fileName, setFileName] = useState(null);
    const [fileScores, setFileScores] = useState(null);
    const [fileError, setFileError] = useState(false);
    const [localDatasetSelection, setLocalDatasetSelection] = useState(datasetSelection);

    function handleFile(e) {
        const text = (e.target.result)
        const jsonScores = JSON.parse(text)
        setFileScores(jsonScores)
      }
      

    // https://medium.com/@miniceo/front-end-shorts-how-to-read-content-from-the-file-input-in-react-17f49b293909
    const selectScoresFile = async (e) => {
        if (e?.target?.files.length > 0) {
            e.preventDefault()
            let fileName = e.target.files[0]['name']
            setFileName(fileName)
            const reader = new FileReader()
            reader.onload = handleFile
            reader.readAsText(e.target.files[0])
        }
        else {
            setFileError(false)
            setFileName(null)
        }
    }

    useEffect(() => {
        setY(datasets[localDatasetSelection]['y'])
        setDatasetSelection(localDatasetSelection)
    }, [localDatasetSelection]);
    
    useEffect(() => {
        if (fileScores !== null
            && fileScores.hasOwnProperty('scores_group1')
            && fileScores['scores_group1'].length === datasets[localDatasetSelection]['y']['y_group1'].length
            && fileScores.hasOwnProperty('scores_group2')
            && fileScores['scores_group2'].length === datasets[localDatasetSelection]['y']['y_group2'].length) {
                setScores(fileScores)
                setFileError(false)
            }
            else {
                setScores(datasets[localDatasetSelection]['scores'])
                setFileError(true)
            }
            setFileID(++fileID)
    }, [fileScores, localDatasetSelection]);

    return(
        <div className="DatasetSelector">
        <h1>Dataset</h1>
        <label htmlFor="datasetSelection">Choose a dataset</label>
        <select name="datasetSelection" id="pattern" value={datasetSelection} onChange={(e) => setLocalDatasetSelection(e.target.value)}>
            <option value="Credit Lending">Credit Lending</option>
            <option value="Algorithmic Hiring">Algorithmic Hiring</option>
            <option value="COMPAS">COMPAS</option>
        </select>
        <br/>
        <label htmlFor="scoreUpload">Upload your predictions:</label>
        <input type="file" name="file" onChange={selectScoresFile} />
        {fileName === null &&
            <div>N.B.: No file has been uploaded, so the default scores for {datasetSelection} will be used.</div>
        }
        {fileName !== null && fileError &&
            <div>N.B.: Selected "{fileName}", but the scores don't match the dataset, so the default scores for {datasetSelection} will be used.</div>
        }
        {fileName !== null && !fileError &&
            <div>Selected "{fileName}"</div>
        }
        </div>
    )
}
  
export default DatasetSelector;