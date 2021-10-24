import React from 'react';
import './Statistics.css';
import ComparisonPlot from '../ComparisonPlot';

const Statistics = ({shares, shares_labels, base_rates, base_rates_labels}) => {
    return (
        <div className="FirstRow">
            <h3>Statistics</h3>
            <ComparisonPlot labels={shares_labels} data={shares} ylabel="Geschlechteranteile" explanation="Welchen Anteil haben am Frauen und Männer am Datensatz?"/>
            <ComparisonPlot labels={base_rates_labels} data={base_rates} ylabel="Performance-Grundraten" explanation="Welcher Anteil an Frauen und Männern erhielt in den Daten eine gute Performance-Beurteilung?"/>
        </div>  
      );
}

export default Statistics;