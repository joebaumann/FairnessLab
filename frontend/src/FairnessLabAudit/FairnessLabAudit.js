import './FairnessLabAudit.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'


function FairnessLabAudit() {
    return(
      <div className="FairnessLabAudit">
        <FairnessLabAuditHeader />
        <FairnessMetricSelection />
      </div>
    )
  }
  
  
  function FairnessLabAuditHeader() {
  
    return (
      <header className="FairnessLabAudit-header">
        <h1>Fairness Lab: Audit</h1>
      </header>
    );
  
  }
  
  
  
  function NothingSelected() {
    return (
      <h1 id="NothingSelected" className="NothingSelected">You selected nothing.</h1>
    );
  }
  
  function MetricSelected({fairnessMetric, sliderValue}) {
  
    const [getMessage, setGetMessage] = useState({});
    const [getData, setGetData] = useState({});
    
  
    useEffect(()=>{
      axios.get('http://localhost:5000/home').then(response => {
        console.log("SUCCESS", response)
        setGetMessage(response)
      }).catch(error => {
        console.log(error)
      })
  
    }, [])
  
    useEffect(()=>{
      var url = 'http://localhost:5000/fairnessmetrics/' + fairnessMetric + '/' + sliderValue;
      console.log("url!", url)
      axios.get(url).then(response => {
        console.log("funktionierts!", response.status)
        console.log("funktionierts?", response)
        setGetData(response)
      }).catch(error => {
        console.log(error)
      })
  
    }, [fairnessMetric, sliderValue])
  
  
    return (
  
      <div id="MetricSelected" className="MetricSelected">
        <h1>You selected metric: {fairnessMetric} and sliderValue: {sliderValue}.</h1>
  
  
  
        <div>
          {getData.status === 200 ? 
          <ul>
            {/* utility: {JSON.stringify(getData.data.metric_values_slider_dict)} */}
            <li>
              utility: {getData.data.metric_values_slider_dict.utility}
            </li>
            <li>
              thresholds: {getData.data.metric_values_slider_dict.thresholds}
            </li>
            <li>
              tpr: {getData.data.metric_values_slider_dict.fairness.tpr}
            </li>
            <li>
              tpr: {getData.data.metric_values_slider_dict.fairness.tpr}
            </li>
            <li>
              tpr: {getData.data.metric_values_slider_dict.fairness.tpr}
            </li>
            <li>
              tpr: {getData.data.metric_values_slider_dict.fairness.tpr}
            </li>
            <li>
              tpr: {getData.data.metric_values_slider_dict.fairness.tpr}
            </li>
          </ul>
          :
          <p>a2</p>}
  
  
        </div>
      </div>
  
    );
  }
  
  function FairnessMetricSelection() {
    const [fairnessMetric, setFairnessMetric] = useState();
    const [sliderValue, setSliderValue] = useState(1);
  
    
    useEffect(() => {
      console.log(`Fairness metric chosen: ${fairnessMetric}!`);
    }, [fairnessMetric]);
    
    useEffect(() => {
      console.log(`Slider value chosen ${sliderValue} !`);
    }, [sliderValue]);
    
  
  
    return (
      <>
      
        <p>Select a fairness metric from the list.</p>
  
        <select id="fairnessMetricDropdown" defaultValue={'DEFAULT'} onChange={() => setFairnessMetric(document.getElementById("fairnessMetricDropdown").value)}>
          <option disabled value="DEFAULT"> -- select an option -- </option>
          <option value="acceptance">Statistical Parity</option>
          <option value="tpr">TPR</option>
          <option value="fpr">FPR</option>
          <option value="ppv">PPV</option>
          <option value="for">FOR</option>
        </select>
  
        <button onClick={() => setSliderValue(0)}>
          Slider value: 0
        </button>
        <button onClick={() => setSliderValue(0.5)}>
          Slider value: 0.5
        </button>
        <button onClick={() => setSliderValue(1)}>
          Slider value: 1
        </button>
          
  
  
        <>
          {fairnessMetric==null ? (
            <NothingSelected />
            ) : (
            <MetricSelected fairnessMetric={fairnessMetric} sliderValue={sliderValue}/>
          )}
  
  
  
        </>
      </>
    );
  }
  
  export default FairnessLabAudit;