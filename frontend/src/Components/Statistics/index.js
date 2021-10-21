import React from 'react';
import './Statistics.css';
import ComparisonPlot from '../ComparisonPlot';

const Statistics = ({shares, shares_labels, base_rates, base_rates_labels}) => {
    return (
        <div>
            <h3>Statistics</h3>
            <ComparisonPlot className="FirstRow" labels={shares_labels} data={shares} ylabel="Anteile" explanation="Welchen Anteil haben am Frauen und Männer am Datensatz?"/>
            <ComparisonPlot className="FirstRow" labels={base_rates_labels} data={base_rates} ylabel="Grundraten" explanation="Welcher Anteil an Frauen und Männern ist in den Daten als 'gut' bewertet?"/>
        </div>  
      );
}

export default Statistics;