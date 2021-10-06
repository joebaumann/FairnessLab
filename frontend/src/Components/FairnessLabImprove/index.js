import './FairnessLabImprove.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../Header';
import FairnessFingerprint from '../FairnessFingerprint';

function FairnessLabImprove() {
    return(
      <div className="FairnessLabImprove">
        <Header title="Fairness Lab: Improve"/>
        <FairnessMetricSelection />
      </div>
    )
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
      let fairness;
      let utility;
      if (getData.status === 200) {
        fairness = getData.data.metric_values_slider_dict.fairness;
        utility = getData.data.metric_values_slider_dict.utility
      }

      return (
  
        <div id="MetricSelected" className="MetricSelected">    
          <div>
            {getData.status === 200 ? 
              <FairnessFingerprint utility={utility} fairness={fairness} labels={["Women", "Men"]} />            
            :
            <p>Fairness fingerprint failed with status: {getData.fingerprint.status}</p>}

          </div>
        </div>
    
      );
    };

    return <div>No Data Available.</div>;
  }

  function FairnessMetricSelection() {
    const [fairnessMetric, setFairnessMetric] = useState('acceptance');
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderMoving, setSliderMoving] = useState(false);
  
    useEffect(() => {
      console.log(`Fairness metric chosen: ${fairnessMetric}!`);
    }, [fairnessMetric]);
    
    useEffect(() => {
      console.log(`Slider value chosen ${sliderValue} !`);
    }, [sliderValue]);
    
    return (
      <div className="FairnessMetricSelection">
      
        <label>Fairness metric
          <select className="Dropdown" defaultValue={'acceptance'} onChange={(e) => setFairnessMetric(e.target.value)}>
            <option value="acceptance">Statistical Parity</option>
            <option value="tpr">TPR</option>
            <option value="fpr">FPR</option>
            <option value="ppv">PPV</option>
            <option value="for">FOR</option>
          </select>
        </label>

        <label>Equalization rate
          <input className="Slider" type="range" min="0" max="1" step="0.1" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} onMouseDown={(e) => setSliderMoving(true)} onMouseUp={(e) => setSliderMoving(false)} />
          <span>{sliderValue}</span>
        </label>

        {!sliderMoving
          ? <MetricSelected fairnessMetric={fairnessMetric} sliderValue={sliderValue}/>
          : <h1>Please pick a slider value</h1>
        }

      </div>
    );
  }
  
  export default FairnessLabImprove;