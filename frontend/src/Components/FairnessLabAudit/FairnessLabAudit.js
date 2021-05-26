import './FairnessLabAudit.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function FairnessLabAudit() {
    return(
      <div className="FairnessLabAudit">
        <FairnessLabAuditHeader />
        <FairnessFingerprint />
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
  
  function FairnessFingerprint({fairnessMetric, sliderValue}) {

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

      return (

        <div>
          <h3>Base rates and Fairness Fingerprint:</h3>
    
          <ul style={{display: "inline-block"}}>

            {getData.baseRates.status === 200 ? 
              <li>
                base rates: {JSON.stringify(getData.baseRates.data)}
              </li>
            :
            <p>baseRates: Failed with status: {getData.baseRates.status}</p>}

            {getData.fingerprint.status === 200 ? 
              <li>
                fingerprint:
                <ul>
                  <li>
                    utility: {JSON.stringify(getData.fingerprint.data.metric_values_slider_dict.utility)}
                  </li>
                  <li>
                    thresholds: {JSON.stringify(getData.fingerprint.data.metric_values_slider_dict.thresholds)}
                  </li>
                  <li>
                    acceptance: {JSON.stringify(getData.fingerprint.data.metric_values_slider_dict.fairness.acceptance)}
                  </li>
                  <li>
                    tpr: {JSON.stringify(getData.fingerprint.data.metric_values_slider_dict.fairness.tpr)}
                  </li>
                  <li>
                    fpr: {JSON.stringify(getData.fingerprint.data.metric_values_slider_dict.fairness.fpr)}
                  </li>
                  <li>
                    ppv: {JSON.stringify(getData.fingerprint.data.metric_values_slider_dict.fairness.ppv)}
                  </li>
                  <li>
                    for: {JSON.stringify(getData.fingerprint.data.metric_values_slider_dict.fairness.for)}
                  </li>
                </ul>
              </li>
            :
            <p>fingerprint: Failed with status: {getData.fingerprint.status}</p>}

          </ul>
        </div>
  
      );
    };

    return <div>No Data Available.</div>;
  }

  
  export default FairnessLabAudit;