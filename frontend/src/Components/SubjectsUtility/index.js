import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import './SubjectsUtility.css';

const ParetoPlot = ({subjectsUtility, fairnessScores, group1, group2, selectedPoints, colors}) => {
    let tracesUtilities = []
    let tracesFairnessScores = []
    selectedPoints.forEach(i => {
        let traceUtilities = {
            x: [`${group1} (${i})`, `${group2} (${i})`],
            y: subjectsUtility[i],
            marker:{
              color: [colors[i], colors[i]]
            },
            type: 'bar',
            name: `point ${i}`
        };
        tracesUtilities.push(traceUtilities)
        let traceFairnessScores = {
            x: [`Unfairness score (${i})`],
            y: [fairnessScores[i]],
            marker:{
              color: [colors[i]]
            },
            type: 'bar',
            name: `point ${i}`
        };
        tracesFairnessScores.push(traceFairnessScores)
    })
    
    
    return (
        <div className='SubjectsUtility'>
            <h1>Decision subjects' utility for unfairness score calculation</h1>
            {selectedPoints.length === 0 && 
            <b>Select at least one point in the pareto plot to see something.<br/><br/></b>
            }
            <span>Here you can see a direct comparison of the decision subjects' average utilities scores for the selected points.</span>
            <br/>
            <Plot
                data={tracesUtilities}

                layout = {
                    {
                        title: 'Decision subjects\' utilities',
                    }

                }
            />
            <br/>
            <span>Here you can see a direct comparison of the unfairness scores for the selected points.</span>
            <br/>
            <Plot
                data={tracesFairnessScores}

                layout = {
                    {
                        title: 'Calculated unfairness score',
                    }

                }
            />
        </div>
      );
}

export default ParetoPlot;