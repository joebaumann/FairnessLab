import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import './SubjectsUtility.css';

const ParetoPlot = ({subjectsUtility, fairnessScores, group1, group2, selectedPoints, colors}) => {
    const selectedUtilities = [];
    const colorsUtilities = []
    const groupLabels = []
    const selectedFairnessScore = []
    const colorsFairnessScore = []
    const labelsFairnessScore = []
    selectedPoints.forEach(i => {
        selectedUtilities.push(subjectsUtility[i][0])
        selectedUtilities.push(subjectsUtility[i][1])
        selectedFairnessScore.push(fairnessScores[i])
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
            {selectedPoints.length === 0 && 
            <b>Select at least one point in the pareto plot to see something.<br/><br/></b>
            }
            Here you can see a direct comparison of the decision subjects' average utilities scores for the selected points.
            <br/>
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
            <br/>
            Here you can see a direct comparison of the fairness scores for the selected points.
            <br/>
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