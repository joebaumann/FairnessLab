import './FairnessLabImprove.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../Header';
import FairnessFingerprint from '../FairnessFingerprint';
import ScoreDistribution from '../ScoreDistribution';
import scores from '../../data_static/scores.json';

// the following imports are used to access the static data instead of fetching it dynamically from the backend
import results_for_all_metrics_and_all_sliders from '../../data_static/results_for_all_metrics_and_all_sliders.json';

function FairnessLabImprove() {
    return(
      <div className="FairnessLabImprove">
        <Header title="Fairness Lab: Improve"/>
        <FairnessMetricSelection />
      </div>
    )
  }
  
  function MetricSelected(props) {

    /*
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
    */

    // get the data for selected fairness metric and slider value
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = useState(null);
  
    useEffect(()=>{
      // uncomment if login is required
      // if (!login) return;
      setLoading(true);


      /*

      // use this block to fetch the data dynamically from the backend
      
      let url = 'http://localhost:5000/fairnessmetrics/' + props.fairnessMetric + '/' + props.sliderValue;
      axios.get(url)
      .then(response => {
        console.log("funktionierts?", response)
        setGetData(response)
      })
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error)
      })

      */
      
      // use these three lines to load the static data from the frontend
      var mySliderValue = parseFloat(props.sliderValue).toFixed(1);
      let static_response_data = {metric_values_slider_dict: results_for_all_metrics_and_all_sliders[props.fairnessMetric][mySliderValue]}
      setGetData({status: 200, data: static_response_data})
      setLoading(false)
  

    }, [props.fairnessMetric, props.sliderValue])
    
    if (loading) return <h1>Loading...</h1>;  
  
    if (getData) {
      let fairness;
      let utility;
      let thresholds;
      if (getData.status === 200) {
        fairness = getData.data.metric_values_slider_dict.fairness;
        utility = getData.data.metric_values_slider_dict.utility;
        thresholds = getData.data.metric_values_slider_dict.thresholds;
      }

      return (
  
        <div id="MetricSelected" className="MetricSelected">    
          <div>
            {getData.status === 200 ? 
              <FairnessFingerprint utility={utility} fairness={fairness} labels={["Women", "Men"]} />            
            :
            <p>Fairness fingerprint failed with status: {getData.fingerprint.status}</p>}
            <ScoreDistribution scores={[scores["scores_women"], scores["scores_men"]]} thresholds={thresholds} labels={["Women", "Men"]}/>
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
    const [subcomponentKey, setSubcomponentKey] = useState(0);
  
    useEffect(() => {
      // Fairness metric from fropdown chosen
      setSubcomponentKey(subcomponentKey + 1);
    }, [fairnessMetric]);
    
    useEffect(() => {
      // slider value moved
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
          ? <MetricSelected key={subcomponentKey} fairnessMetric={fairnessMetric} sliderValue={sliderValue}/>
          : <h1>Please pick a slider value</h1>
        }

      </div>
    );
  }
  
  export default FairnessLabImprove;