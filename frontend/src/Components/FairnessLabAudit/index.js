import './FairnessLabAudit.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../Header';
import FairnessFingerprint from '../FairnessFingerprint';

function FairnessLabAudit() {
    return(
      <div className="FairnessLabAudit">
        <Header title="Fairness Lab: Audit"/>
        <FairnessAudit />
      </div>
    )
  }
  
  function FairnessAudit({fairnessMetric, sliderValue}) {

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
  
    function getBaseRates() {
      return axios.get('http://localhost:5000/baserates');
    }
    
    function getFingerprint() {
      return axios.get('http://localhost:5000/fingerprint');
    }
    

    useEffect(()=>{
      // uncomment if login is required
      // if (!login) return;
      setLoading(true);

      
      Promise.all([getBaseRates(), getFingerprint()])
      .then(response => {
        console.log("funktionierts!", response.status)
        console.log("funktionierts?", response)
        setGetData({"baseRates": response[0], "fingerprint": response[1]})
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
      if (getData.fingerprint.status === 200) {
        fairness = getData.fingerprint.data.metric_values_slider_dict.fairness;
        utility = getData.fingerprint.data.metric_values_slider_dict.utility
      }

      return (

        <div>
          {getData.baseRates.status === 200 ? 
            <div>
              <h3>Stats</h3>
              base rates: {JSON.stringify(getData.baseRates.data)}
              {/* <ComparisonPlot labels={["Women", "Men"]} data={getData.baseRates.data} ylabel={'Base rate'}/> */}
            </div> 
            
          :
          <p>Base rates failed with status: {getData.baseRates.status}</p>}

          {getData.fingerprint.status === 200 ? 
            <FairnessFingerprint utility={utility} fairness={fairness} labels={["Women", "Men"]} />            
          :
          <p>Fairness fingerprint failed with status: {getData.fingerprint.status}</p>}
        </div>
  
      );
    };

    return <div>No Data Available.</div>;
  }

  
  export default FairnessLabAudit;