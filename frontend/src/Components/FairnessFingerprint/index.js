import React from 'react';
import './FairnessFingerprint.css';
import UtilityPlot from '../UtilityPlot';
import ComparisonPlot from '../ComparisonPlot';
import { MDBContainer } from "mdbreact";

const FairnessFingerprint = ({utility, fairness, labels}) => {
    return (
        <div>
            <div className="Metrics">
                {Object.keys(fairness).map((metricName, i) => (
                    <ComparisonPlot labels={labels} data={fairness[metricName]} ylabel={metricName} key={metricName}/>
                ))}
                <UtilityPlot utility={utility}/>
            </div>
        </div>  
      );
}

export default FairnessFingerprint;