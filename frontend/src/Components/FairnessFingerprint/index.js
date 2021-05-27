import React from 'react';
import './FairnessFingerprint.css';
import UtilityPlot from '../UtilityPlot';
import ComparisonPlot from '../ComparisonPlot';

const FairnessFingerprint = ({utility, fairness, labels}) => {
    return (
        <div>
            <h3>Fairness Fingerprint</h3>
            <UtilityPlot utility={utility}/>
            {Object.keys(fairness).map((metricName, i) => (
                <ComparisonPlot labels={labels} data={fairness[metricName]} ylabel={metricName} key={metricName}/>
            ))}
        </div>  
      );
}

export default FairnessFingerprint;