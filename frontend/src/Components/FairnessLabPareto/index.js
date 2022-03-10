import './FairnessLabPareto.css';
import React from 'react';
import Header from '../Header';
import ScoreDistribution from '../ScoreDistribution';
import scores from '../../data_static/hr/scores.json';
import ParetoPlot from '../ParetoPlot';

function FairnessLabPareto() {
    return(
      <div className="FairnessLabPareto">
        <Header title="Fairness Lab: Pareto"/>
        <ParetoPlot scores={[scores["scores_women"], scores["scores_men"]]} labels={["Women", "Men"]}/>
        <ScoreDistribution scores={[scores["scores_women"], scores["scores_men"]]} thresholds={[0.2, 0.5]} labels={["Women", "Men"]}/>
      </div>
    )
  }
  
export default FairnessLabPareto;