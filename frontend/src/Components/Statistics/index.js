import React from 'react';
import './Statistics.css';
import ComparisonPlot from '../ComparisonPlot';

const Statistics = ({shares, shares_labels, base_rates, base_rates_labels}) => {
    return (
        <div>
            <h3>Statistics</h3>
            <ComparisonPlot labels={shares_labels} data={shares} ylabel="Shares of"/>
            <ComparisonPlot labels={base_rates_labels} data={base_rates} ylabel="Base rate"/>
        </div>  
      );
}

export default Statistics;