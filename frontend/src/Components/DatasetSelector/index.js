import './DatasetSelector.css';
import React, {useState, useEffect} from 'react';
import compas_file from '../../data_static/compas/compas.json';
import german_file from '../../data_static/credit_lending/german.json';

function DatasetSelector({fileID, setFileID, datasetSelection, setDatasetSelection, setScores, setY, justifier}) {
    const datasets = {
        'COMPAS': {
            'file': compas_file
        },
        'German': {
            'file': german_file
        }
    }

	// const [fileName, setFileName] = useState(null);
    // const [fileScores, setFileScores] = useState(null);
    // const [fileError, setFileError] = useState(false);
    const [localDatasetSelection, setLocalDatasetSelection] = useState('COMPAS');

    // function handleFile(e) {
    //     const text = (e.target.result)
    //     const jsonScores = JSON.parse(text)
    //     setFileScores(jsonScores)
    //   }

    // // https://medium.com/@miniceo/front-end-shorts-how-to-read-content-from-the-file-input-in-react-17f49b293909
    // const selectScoresFile = async (e) => {
    //     if (e?.target?.files.length > 0) {
    //         e.preventDefault()
    //         let fileName = e.target.files[0]['name']
    //         setFileName(fileName)
    //         const reader = new FileReader()
    //         reader.onload = handleFile
    //         reader.readAsText(e.target.files[0])
    //     }
    //     else {
    //         setFileError(false)
    //         setFileName(null)
    //     }
    // }

    function prepareData() {
        let results = splitFileBySensitiveAttributeAndJustifier(datasets[localDatasetSelection]['file'], justifier)
        let y = results[0]
        let scores = results[1]
        setY(y)
        setScores(scores)
        setDatasetSelection(localDatasetSelection)
    }

    function applyJustifierToRow(row, justifier) {
        switch(justifier) {
            case 'no_justifier':
                return true;
            case 'y_0':
                return row['Y'] === 0;
            case 'y_1':
                return row['Y'] === 1;
            case 'd_0':
                return row['D'] === 0;
            case 'd_1':
                return row['D'] === 1;
        }
    }

    function splitFileBySensitiveAttributeAndJustifier(file, justifier) {
        let y_group1 = []
        let scores_group1 = []
        let d_group1 = []
        let y_group2 = []
        let scores_group2 = []
        let d_group2 = []
        // first rows that are not for selected justifier and then loop through each row in the dataframe
        file.filter(row => applyJustifierToRow(row, justifier)).forEach(function (row, index) {
            if (row['sensitive-attribute'] === 0) {
                y_group1.push(row['Y'])
                scores_group1.push(row['scores'])
                d_group1.push(row['D'])
            } else {
                y_group2.push(row['Y'])
                scores_group2.push(row['scores'])
                d_group2.push(row['D'])
            }
        })
        return [{"y_group1": y_group1, "y_group2": y_group2}, {"scores_group1": scores_group1, "scores_group2": scores_group2}]
    }

    useEffect(() => {
        console.log('execute once')
        prepareData()
    }, []);
    
    useEffect(() => {
        console.log('setlocaldatasetselection', localDatasetSelection)
        prepareData()
    }, [localDatasetSelection, justifier]);
    
    // useEffect(() => {
    //     if (fileScores !== null
    //         && fileScores.hasOwnProperty('scores_group1')
    //         && fileScores['scores_group1'].length === datasets[localDatasetSelection]['y']['y_group1'].length
    //         && fileScores.hasOwnProperty('scores_group2')
    //         && fileScores['scores_group2'].length === datasets[localDatasetSelection]['y']['y_group2'].length) {
    //             setScores(fileScores)
    //             setFileError(false)
    //         }
    //         else {
    //             setScores(datasets[localDatasetSelection]['scores'])
    //             setFileError(true)
    //         }
    //         setFileID(++fileID)
    // }, [fileScores, localDatasetSelection]);

    return(
        <div className="DatasetSelector">
        <h1>Dataset</h1>
        <label htmlFor="datasetSelection">Choose a dataset</label>
        <select name="datasetSelection" id="pattern" value={datasetSelection} onChange={(e) => setLocalDatasetSelection(e.target.value)}>
            <option value="COMPAS">COMPAS</option>
            <option value="German">Credit lending (UCI German Credit)</option>
        </select>
        {/* <br/>
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
        } */}
        </div>
    )
}
  
export default DatasetSelector;