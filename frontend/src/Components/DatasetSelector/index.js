import './DatasetSelector.css';
import React, {useState, useEffect} from 'react';
import compas_file from '../../data_static/compas/compas.json';
import german_file from '../../data_static/credit_lending/german.json';

function DatasetSelector({datasetSelection, setDatasetSelection, setScores, setY, justifier, datasetSelectionCounter, setDatasetSelectionCounter}) {
    const datasets = {
        'COMPAS': {
            'file': compas_file
        },
        'German': {
            'file': german_file
        },
        'Own': {
            'file': []
        }
    }

    const [uploadedData, setUploadedData] = useState([]);
    const [fileError, setFileError] = useState(false);

    function handleFile(e) {
        try {
            const text = (e.target.result)
            const jsonFile = JSON.parse(text)
            setUploadedData(jsonFile)
        } catch (error) {
            setFileError(true)
        }
      }

    // // https://medium.com/@miniceo/front-end-shorts-how-to-read-content-from-the-file-input-in-react-17f49b293909
    const selectFile = async (e) => {
        if (e?.target?.files.length > 0) {
            e.preventDefault()
            const reader = new FileReader()
            reader.onload = handleFile
            reader.readAsText(e.target.files[0])
        }
    }

    function processData() {
        let file
        if (datasetSelection == 'Own') {
            file = uploadedData
        } else {
            file = datasets[datasetSelection]['file']
        }
        try {
            let results = splitFileBySensitiveAttributeAndJustifier(file, justifier)
            let y = results[0]
            let scores = results[1]
            setY(y)
            setScores(scores)
            setFileError(false)
        } catch (error) {
            setY({'y_group1': [], 'y_group2': []})
            setScores({'scores_group1': [], 'scores_group2': []})
            setFileError(true)
        }
        setDatasetSelectionCounter(datasetSelectionCounter + 1)
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
        processData()
    }, []);
    
    useEffect(() => {
        processData()
    }, [datasetSelection, justifier]);
    
    useEffect(() => {
            processData()
    }, [uploadedData, datasetSelection]);

    useEffect(() => {
        if (uploadedData.length !== 0) {
            setDatasetSelection('Own')
        }
    }, [uploadedData]);

    return(
        <div className="DatasetSelector">
        <h1>Dataset</h1>
        <div>Choose a dataset that you want to audit. If you want to upload your own dataset, please make sure that it has a column named 'Y' (only 0 and 1 allowed), a column named 'scores' (values have to be between 0 and 1) and a column named 'sensitive-attribute' (only 0 and 1 allowed).</div>
        <br/>
        <span value={datasetSelection} onChange={(e) => setDatasetSelection(e.target.value)}>
            <input name="datasetSelection" type="radio" value="COMPAS" checked={datasetSelection === "COMPAS"} /> COMPAS
            <br/>
            <input name="datasetSelection" type="radio" value="German" checked={datasetSelection === "German"} /> Credit lending (UCI German Credit)
            <br/>
            <input name="datasetSelection" type="radio" value="Own" checked={datasetSelection === "Own"} /> Choose your own dataset: 
        </span>
        <input type="file" name="file" onChange={selectFile} />
        <br/>
        {datasetSelection == 'Own' && uploadedData.length === 0 &&
            <div>Please upload a dataset to audit or choose one of the predefined datasets.</div>
        }
        {datasetSelection == 'Own' && fileError &&
            <div>Error: The feature labels of the selected file don't match the template. Please upload a dataset with the right feature labels.</div>
        }
        </div>
    )
}
  
export default DatasetSelector;