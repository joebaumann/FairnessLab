import React from 'react';
import './FairnessFingerprint.css';
import UtilityPlot from '../UtilityPlot';
import ComparisonPlot from '../ComparisonPlot';
import config from './config.json';

const FairnessFingerprint = ({utility, fairness, labels}) => {
    return (
        <div>
            <div className="Metrics">
                {Object.keys(config).map((metricName, i) =>
                {true &&
                    <ComparisonPlot labels={labels} data={fairness[metricName]} ylabel={config[metricName]["visible"]} explanation={config[metricName]["explanations"]["hr"]["de"]} key={metricName}/>
                }
                )}
                <UtilityPlot utility={utility}/>
            </div>
        </div>  
      );
}

export default FairnessFingerprint;