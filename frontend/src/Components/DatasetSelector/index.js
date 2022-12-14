import './DatasetSelector.css';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import compas_file from '../../data_static/compas/compas.json';
import german_file from '../../data_static/credit_lending/german.json';
import ACSEmploymentCA_file from '../../data_static/ACS/ACSEmployment_CA.json';

import { getDatasetSelection, changeDatasetSelection, changeFilteredData, changeUnfilteredData } from '../../store/dataset';
import { getJustifier } from '../../store/fairnessScore';

function DatasetSelector({}) {
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

    const datasetSelection = useSelector(getDatasetSelection)
    const justifier = useSelector(getJustifier);
    const dispatch = useDispatch ()
    function setDatasetSelection(selection) {dispatch(changeDatasetSelection(selection))}
    function setFilteredData(data) {dispatch(changeFilteredData(data))}
    function setUnfilteredData(data) {dispatch(changeUnfilteredData(data))}

    const [uploadedData, setUploadedData] = useState([]);
    const [fileError, setFileError] = useState(false);

    function handleFileJson(e) {
        const text = (e.target.result)
        const jsonFile = JSON.parse(text)
        setUploadedData(jsonFile)
    }

    function handleFileCSV(e) {
        const text = (e.target.result)
        const jsonFile = csvToJSON(text)
        setUploadedData(jsonFile)
    }

    // http://techslides.com/convert-csv-to-json-in-javascript
    function csvToJSON(csv){

        let newLineCharacter = '\n'
        if (csv.indexOf('\r\n') !== -1) {
            newLineCharacter = '\r\n'
        } else if (csv.indexOf('\r') !== -1) {
            newLineCharacter = '\r'
        }
        let lines = csv.split(newLineCharacter);
    
        let result = [];
    
        let headers = lines[0].split(",");
    
        for(var i=1;i<lines.length-1;i++){
    
            let obj = {};
            let currentline=lines[i].split(",");
    
            for (let j=0;j<headers.length;j++){
                let value = currentline[j];
                if (headers[j] === 'Y' || headers[j] === 'D' || headers[j] === 'sensitive-attribute') {
                    value = parseInt(value)
                } else if (headers[j] === 'scores') {
                    value = parseFloat(value)
                }
                obj[headers[j]] = value
            }
    
            result.push(obj);
    
        }
    
        return result;
    }

    // https://medium.com/@miniceo/front-end-shorts-how-to-read-content-from-the-file-input-in-react-17f49b293909
    const selectFile = async (e) => {
        try {
            if (e?.target?.files.length > 0) {
                e.preventDefault()
                const reader = new FileReader()
                if (e.target.files[0].type === "application/json") {
                    reader.onload = handleFileJson
                } else if (e.target.files[0].type === "text/csv") {
                    reader.onload = handleFileCSV
                } else {
                    throw 'Wrong file type'
                }
                reader.readAsText(e.target.files[0])
            }
            setFileError(false)
        } catch (error) {
            setFilteredData({'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]})
            setUnfilteredData({'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]})
            setFileError(true)
        }
    }

    function processData() {
        let file
        if (datasetSelection === 'Own') {
            file = uploadedData
        } else {
            file = datasets[datasetSelection]['file']
        }
        try {
            let processedData = splitFileBySensitiveAttributeAndJustifier(file, justifier)
            let filteredData = processedData['filteredData']
            let unfilteredData = processedData['unfilteredData']
            checkDataValidity(filteredData, unfilteredData)
            setFilteredData(filteredData)
            setUnfilteredData(unfilteredData)
            setFileError(false)
        } catch (error) {
            setFilteredData({'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]})
            setUnfilteredData({'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]})
            setFileError(true)
        }
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
        let filteredData = {'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]}
        let unfilteredData = {'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]}
        file.forEach(function (row, index) {
            let attribute = row['sensitive-attribute']
            unfilteredData['y'][attribute].push(row['Y'])
            if (row.hasOwnProperty('scores')) {
                unfilteredData['scores'][attribute].push(row['scores'])
            }
            if (row.hasOwnProperty('D')) {
                unfilteredData['d'][attribute].push(row['D'])
            }
            if (applyJustifierToRow(row, justifier)) {
                filteredData['y'][attribute].push(row['Y'])
                if (row.hasOwnProperty('scores')) {
                    filteredData['scores'][attribute].push(row['scores'])
                }
                if (row.hasOwnProperty('D')) {
                    filteredData['d'][attribute].push(row['D'])
                }
            }
        })
        return {'filteredData': filteredData, 'unfilteredData': unfilteredData}
    }

    function checkDataValidity(filteredData, unfilteredData) {
        let isValid = false;
        if (filteredData['y'][0].length !== 0 && filteredData['y'][0].length === filteredData['scores'][0].length && filteredData['y'][0].length === filteredData['d'][0].length
            && filteredData['y'][1].length !== 0 && filteredData['y'][1].length === filteredData['scores'][1].length && filteredData['y'][1].length === filteredData['d'][1].length
            && unfilteredData['y'][0].length !== 0 && unfilteredData['y'][0].length === unfilteredData['scores'][0].length && unfilteredData['y'][0].length === unfilteredData['d'][0].length
            && unfilteredData['y'][1].length !== 0 && unfilteredData['y'][1].length === unfilteredData['scores'][1].length && unfilteredData['y'][1].length === unfilteredData['d'][1].length) {
            isValid = true;
        } else if (filteredData['y'][0].length !== 0 && filteredData['y'][0].length === filteredData['scores'][0].length && filteredData['d'][0].length === 0
            && filteredData['y'][1].length !== 0 && filteredData['y'][1].length === filteredData['scores'][1].length && filteredData['d'][1].length === 0
            && unfilteredData['y'][0].length !== 0 && unfilteredData['y'][0].length === unfilteredData['scores'][0].length && unfilteredData['d'][0].length === 0
            && unfilteredData['y'][1].length !== 0 && unfilteredData['y'][1].length === unfilteredData['scores'][1].length && unfilteredData['d'][1].length === 0) {
            isValid = true;
        } else if (filteredData['y'][0].length !== 0 && filteredData['y'][0].length === filteredData['d'][0].length && filteredData['scores'][0].length === 0
            && filteredData['y'][1].length !== 0 && filteredData['y'][1].length === filteredData['d'][1].length && filteredData['scores'][1].length === 0
            && unfilteredData['y'][0].length !== 0 && unfilteredData['y'][0].length === unfilteredData['d'][0].length && unfilteredData['scores'][0].length === 0
            && unfilteredData['y'][1].length !== 0 && unfilteredData['y'][1].length === unfilteredData['d'][1].length && unfilteredData['scores'][1].length === 0) {
            isValid = true;
        }
        if (!isValid) {
            throw 'Incorrect format!';
        }
    }

    useEffect(() => {
        processData()
    }, []);
    
    useEffect(() => {
        processData()
    }, [datasetSelection, justifier, uploadedData]);

    useEffect(() => {
        if (uploadedData.length !== 0) {
            setDatasetSelection('Own')
        }
    }, [uploadedData]);

    return(
        <div className="DatasetSelector">
        <h1>Dataset</h1>
        <div>Choose a dataset that you want to audit.</div>
        <br/>
        <span value={datasetSelection}>
            <input name="datasetSelection" type="radio" value="COMPAS" onChange={(e) => setDatasetSelection(e.target.value)} checked={datasetSelection === "COMPAS"} /> <b>COMPAS</b>
            <div className="datasetExplanation">
                The COMPAS dataset was collected by ProPublica for their article "Machine Bias." We preprocessed the dataset to make it usable for this demo. The predicted scores are the original (decimal) scores from COMPAS.
                <ul>
                    <li>Y=0: Was arrested within two years</li>
                    <li>Y=1: Was not arrested within two years</li>
                    <li>D=0: Predicted to be rearrested</li>
                    <li>D=1: Predicted not to be rearrested</li>
                    <li>Group 1: Black</li>
                    <li>Group 2: white</li>
                </ul>
                <a href="https://github.com/joebaumann/FairnessLab/blob/main/frontend/src/data_static/compas/Compas%20Analysis%20-%20Unifying%20framework.ipynb" target="_blank" rel="noreferrer">You can find the notebook here to see how we prepared the data.</a>
            </div>
            <br/>
            <input name="datasetSelection" type="radio" value="German" onChange={(e) => setDatasetSelection(e.target.value)} checked={datasetSelection === "German"} /> <b>Credit lending (UCI German Credit)</b>
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
                <a href="https://github.com/joebaumann/FairnessLab/blob/main/frontend/src/data_static/credit_lending/UCI%20German%20Credit.ipynb" target="_blank" rel="noreferrer">You can find the notebook here to see how we prepared the data.</a>
            </div>
            <br/>
            <input name="datasetSelection" type="radio" value="ACSEmploymentCA" onChange={(e) => setDatasetSelection(e.target.value)} checked={datasetSelection === "ACSEmploymentCA"} /> <b>ACSEmployment (California)</b>
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
                <a href="https://colab.research.google.com/drive/1R_UgSktEOFPccktXDis8VakEFJwuEvmd?usp=sharing" target="_blank" rel="noreferrer">You can find the notebook here to see how we prepared the data.</a>
            </div>
            <br/>
            <input name="datasetSelection" type="radio" value="Own" onChange={(e) => setDatasetSelection(e.target.value)} checked={datasetSelection === "Own"} /> <b>Choose your own dataset:</b>
        </span>
        <input type="file" name="file" onChange={selectFile} />
        <div className="datasetExplanation">
            If you want to upload your own dataset as a CSV file, please make sure that it has <ul>
            <li>a column named 'Y' (only 0 and 1 allowed)</li>
            <li>a column named 'sensitive-attribute' (only 0 and 1 allowed)</li>
            <li>a column named 'scores' (values have to be between 0 and 1) and/or a column named 'D' (only 0 and 1 allowed)</li>
            </ul>
            You can also upload a JSON file with an array of objects that contain the previously mentioned attributes
        </div>
        <br/>
        {datasetSelection === 'Own' && uploadedData.length === 0 && fileError &&
            <div className="datasetExplanation">Error: Please upload a dataset to audit or choose one of the predefined datasets.</div>
        }
        {datasetSelection === 'Own' && uploadedData.length !== 0 && fileError &&
            <div className="datasetExplanation">Error: The feature labels of the selected file don't match the template. Please upload a dataset with the right feature labels.</div>
        }
        </div>
    )
}
  
export default DatasetSelector;