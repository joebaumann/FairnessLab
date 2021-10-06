import './FairnessLabAudit.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../Header';
import FairnessFingerprint from '../FairnessFingerprint';
import Statistics from '../Statistics';

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

    function getShares() {
      return axios.get('http://localhost:5000/shares');
    }
    
    function getFingerprint() {
      return axios.get('http://localhost:5000/fingerprint');
    }
    

    useEffect(()=>{
      // uncomment if login is required
      // if (!login) return;
      setLoading(true);

      
      Promise.all([getBaseRates(), getShares(), getFingerprint()])
      .then(response => {
        console.log("funktionierts!", response.status)
        console.log("funktionierts?", response)
        setGetData({"baseRates": response[0], "shares": response[1], "fingerprint": response[2]})
      })
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error)
      })
  
    }, [fairnessMetric, sliderValue])
    
    if (loading) return <h1>Loading...</h1>;  
  
    if (getData) {
      let fairness, utility;
      let base_rates, base_rates_labels;
      let shares, shares_labels;
      if (getData.fingerprint.status === 200) {
        fairness = getData.fingerprint.data.metric_values_slider_dict.fairness;
        utility = getData.fingerprint.data.metric_values_slider_dict.utility;
      }
      if (getData.baseRates.status === 200) {
        base_rates = getData.baseRates.data.statistic;
        base_rates_labels = getData.baseRates.data.labels;
      }
      if (getData.shares.status === 200) {
        shares = getData.shares.data.statistic;
        shares_labels = getData.shares.data.labels;
      }

      return (

        <div>
          {getData.baseRates.status === 200 && getData.shares.status == 200 ? 
            <Statistics base_rates={base_rates} base_rates_labels={base_rates_labels} shares={shares} shares_labels={shares_labels} />
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