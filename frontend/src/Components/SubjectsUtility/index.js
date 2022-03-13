import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import './SubjectsUtility.css';
import subjects_utility from '../../data_static/compas/static_pareto/subjects_utility.json';
import fairness_score from '../../data_static/compas/static_pareto/fairness_score.json';

const ParetoPlot = ({scores, labels, group1, group2, selectedPoints, colors}) => {
    const selectedUtilities = [];
    const colorsUtilities = []
    const groupLabels = []
    const selectedFairnessScore = []
    const colorsFairnessScore = []
    const labelsFairnessScore = []
    selectedPoints.forEach(i => {
        selectedUtilities.push(subjects_utility[i][0])
        selectedUtilities.push(subjects_utility[i][1])
        selectedFairnessScore.push(fairness_score[i])
        colorsUtilities.push(colors[i])
        colorsUtilities.push(colors[i])
        colorsFairnessScore.push(colors[i])
        groupLabels.push(group1 + ' ' + i.toString())
        groupLabels.push(group2 + ' ' + i.toString())
        labelsFairnessScore.push('Fairness score ' + i.toString())
    })
    
    return (
        <div className='SubjectsUtility'>
            <h1>Decision subjects' utility for fairness score calculation</h1>
            <Plot
                data={[
                {
                    x: groupLabels,
                    y: selectedUtilities,
                    marker:{color: colorsUtilities},
                    type: 'bar',
                },
                ]}

                layout = {
                    {
                        title: 'Decision subjects\' utilities',
                    }

                }
            />
            <Plot
                data={[
                {
                    x: labelsFairnessScore,
                    y: selectedFairnessScore,
                    marker:{color: colorsFairnessScore},
                    type: 'bar',
                },
                ]}

                layout = {
                    {
                        title: 'Calculated fairness score',
                    }

                }
            />
        </div>
      );
}

export default ParetoPlot;