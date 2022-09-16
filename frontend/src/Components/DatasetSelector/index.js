import './DatasetSelector.css';
import React, {useState, useEffect} from 'react';
import compas_file from '../../data_static/compas/compas.json';
import german_file from '../../data_static/credit_lending/german.json';
import ACSEmploymentCA_file from '../../data_static/ACS/ACSEmployment_CA.json';

function DatasetSelector({datasetSelection, setDatasetSelection, setScores, setY, justifier, datasetSelectionCounter, setDatasetSelectionCounter}) {
    const datasets = {
        'COMPAS': {
            'file': compas_file
        },
        'German': {
            'file': german_file
        },
        'ACSEmploymentCA': {
            'file': ACSEmploymentCA_file
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
                if (row.hasOwnProperty('scores')) {
                    scores_group1.push(row['scores'])
                }
                if (row.hasOwnProperty('D')) {
                    d_group1.push(row['D'])
                }
            } else {
                y_group2.push(row['Y'])
                if (row.hasOwnProperty('scores')) {
                    scores_group2.push(row['scores'])
                }
                if (row.hasOwnProperty('D')) {
                    d_group2.push(row['D'])
                }
            }
        })
        let isValid = false
        if (y_group1.length === scores_group1.length && y_group1.length === d_group1.length 
            && y_group2.length === scores_group2.length && y_group2.length === d_group2.length) {
                isValid = true
        } else if (y_group1.length === scores_group1.length && d_group1.length === 0
            && y_group2.length === scores_group2.length && d_group2.length === 0) {
                isValid = true
        } else if (y_group1.length === d_group1.length && scores_group1.length === 0
            && y_group2.length === d_group2.length && scores_group2.length === 0) {
                isValid = true
        }
        if (!isValid) {
            throw 'Incorrect format!'
        }
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
        <div>Choose a dataset that you want to audit. If you want to upload your own dataset, please make sure that it has (1) a column named 'Y' (only 0 and 1 allowed), (2) a column named 'sensitive-attribute' (only 0 and 1 allowed) and (3) a column named 'scores' (values have to be between 0 and 1) and/or a column named 'D' (only 0 and 1 allowed).</div>
        <br/>
        <span value={datasetSelection} onChange={(e) => setDatasetSelection(e.target.value)}>
            <input name="datasetSelection" type="radio" value="COMPAS" defaultChecked={datasetSelection === "COMPAS"} /> <b>COMPAS</b>
            <div className="datasetExplanation">
                The COMPAS dataset was collected by ProPublica for their article "Machine Bias." We <a href="https://github.com/propublica/compas-analysis" target="_blank">preprocessed</a> the dataset to make it usable for this demo. The predicted scores are the original (decimal) scores from COMPAS.
                <ul>
                    <li>Y=0: Was arrested within two years</li>
                    <li>Y=1: Was not arrested within two years</li>
                    <li>D=0: Predicted to be rearrested</li>
                    <li>D=1: Predicted not to be rearrested</li>
                    <li>Group 1: Black</li>
                    <li>Group 2: white</li>
                </ul>
            </div>
            <br/>
            <input name="datasetSelection" type="radio" value="German" defaultChecked={datasetSelection === "German"} /> <b>Credit lending (UCI German Credit)</b>
            <div className="datasetExplanation">
                The German Credit dataset is available in the UCI repository. It is a small dataset of German credit loans from the 1970s. The scores have been predicted with a vanilla logistic regression.
                <ul>
                    <li>Y=0: Defaulted on the loan</li>
                    <li>Y=1: Repaid the loan</li>
                    <li>D=0: Predicted to default</li>
                    <li>D=1: Predicted to repay</li>
                    <li>Group 1: female</li>
                    <li>Group 2: male</li>
                </ul>
            </div>
            <br/>
            <input name="datasetSelection" type="radio" value="ACSEmploymentCA" defaultChecked={datasetSelection === "ACSEmploymentCA"} /> <b>ACSEmployment (California)</b>
            <div className="datasetExplanation">
                The ACSEmployment dataset is derived from US Census data and is available through the Folktables GitHub repository. It is a large dataset of US adults from California. The task is to predict whether an individual is employed. The scores have been predicted with a vanilla logistic regression.
                <ul>
                    <li>Y=0: Is not employed</li>
                    <li>Y=1: Is employed</li>
                    <li>D=0: Predicted to be unemployed</li>
                    <li>D=1: Predicted to be employed</li>
                    <li>Group 1: Black</li>
                    <li>Group 2: white</li>
                </ul>
            </div>
            <br/>
            <input name="datasetSelection" type="radio" value="Own" defaultChecked={datasetSelection === "Own"} /> <b>Choose your own dataset:</b>
        </span>
        <input type="file" name="file" onChange={selectFile} />
        <br/>
        {datasetSelection == 'Own' && uploadedData.length === 0 &&
            <div className="datasetExplanation">Please upload a dataset to audit or choose one of the predefined datasets.</div>
        }
        {datasetSelection == 'Own' && fileError &&
            <div className="datasetExplanation">Error: The feature labels of the selected file don't match the template. Please upload a dataset with the right feature labels.</div>
        }
        </div>
    )
}
  
export default DatasetSelector;