import './FairnessLabMakeFair.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../Header';

function FairnessLabMakeFair() {
    return(
      <div className="FairnessLabMakeFair">
        <Header title="Fairness Lab: Make Fair"/>
        <FairnessMetricSelection />
      </div>
    )
  }
  
  function NothingSelected() {
    return (
      <h1 id="NothingSelected" className="NothingSelected">Please select a fairness metric.</h1>
    );
  }
  
  function MetricSelected({fairnessMetric, sliderValue}) {

    // test the connection
    const [testMessage, setTestMessage] = useState({});
    useEffect(()=>{
      // example to check connection
      axios.get('http://localhost:5000/home')
      .then(response => {
        console.log("SUCCESS", response)
        setTestMessage(response)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

    // get the data for selected fairness metric and slider value
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = useState(null);
  
    useEffect(()=>{
      // uncomment if login is required
      // if (!login) return;
      setLoading(true);
      let url = 'http://localhost:5000/fairnessmetrics/' + fairnessMetric + '/' + sliderValue;
      axios.get(url)
      .then(response => {
        console.log("funktionierts!", response.status)
        console.log("funktionierts?", response)
        setGetData(response)
      })
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error)
      })
  
    }, [fairnessMetric, sliderValue])
    
    if (loading) return <h1>Loading...</h1>;  
  
    if (getData) {

      return (
  
        <div id="MetricSelected" className="MetricSelected">
          <h1>You selected metric: {fairnessMetric} and sliderValue: {sliderValue}.</h1>
    
          <div>
            {getData.status === 200 ? 
            <ul style={{display: "inline-block"}}>
              {/* utility: {JSON.stringify(getData.data.metric_values_slider_dict)} */}
              <li>
                utility: {JSON.stringify(getData.data.metric_values_slider_dict.utility)}
              </li>
              <li>
                thresholds: {JSON.stringify(getData.data.metric_values_slider_dict.thresholds)}
              </li>
              <li>
                acceptance rate: {JSON.stringify(getData.data.metric_values_slider_dict.fairness.acceptance)}
              </li>
              <li>
                tpr: {JSON.stringify(getData.data.metric_values_slider_dict.fairness.tpr)}
              </li>
              <li>
                fpr: {JSON.stringify(getData.data.metric_values_slider_dict.fairness.fpr)}
              </li>
              <li>
                ppv: {JSON.stringify(getData.data.metric_values_slider_dict.fairness.ppv)}
              </li>
              <li>
                for: {JSON.stringify(getData.data.metric_values_slider_dict.fairness.for)}
              </li>
            </ul>
            :
            <p>Failed with status: {getData.status}</p>}

          </div>
        </div>
    
      );
    };

    return <div>No Data Available.</div>;
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
  
  export default FairnessLabMakeFair;