import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import './SubjectsUtility.css';

const SubjectsUtility = ({subjectsUtility, fairnessScores, group1, group2, selectedPoints, colors, idOfSelectedPoints}) => {
    let tracesUtilities = []
    let tracesFairnessScores = []
    selectedPoints.forEach(i => {
        let traceUtilities = {
            x: [`${group1} (${idOfSelectedPoints[i].id})`, `${group2} (${idOfSelectedPoints[i].id})`],
            y: subjectsUtility[i],
            marker:{
              color: [colors[i], colors[i]]
            },
            type: 'bar',
            name: 'Selection ' + idOfSelectedPoints[i].id
        };
        tracesUtilities.push(traceUtilities)
        let traceFairnessScores = {
            x: [`Fairness score (${idOfSelectedPoints[i].id})`],
            y: [fairnessScores[i]],
            marker:{
              color: [colors[i]]
            },
            type: 'bar',
            name: 'Selection ' + idOfSelectedPoints[i].id
        };
        tracesFairnessScores.push(traceFairnessScores)
    })
    
    
    return (
        <div className='SubjectsUtility'>
            <h1>Decision subjects' utility for fairness score calculation</h1>
            {selectedPoints.length === 0 && 
            <b>Select at least one point in the pareto plot to see something.<br/><br/></b>
            }
            <span>Here you can see a direct comparison of the decision subjects' average utilities for the selected points.</span>
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
            <span>Here you can see a direct comparison of the fairness scores for the selected points. The higher the score, the less fair the decision rule is considered to be.</span>
            <br/>
            <Plot
                data={tracesFairnessScores}

                layout = {
                    {
                        title: 'Calculated fairness score',
                    }

                }
            />
        </div>
      );
}

export default SubjectsUtility;