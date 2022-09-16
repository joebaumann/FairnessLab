import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import './SubjectsUtility.css';

const SubjectsUtility = ({subjectsUtility, fairnessScores, group1, group2, selectedPoints, colors, idOfSelectedPoints, evaluationOfD}) => {
    let tracesUtilities = []
    let tracesFairnessScores = []
    selectedPoints.forEach(i => {
        let traceUtilities = {
            x: [`${group1} (${idOfSelectedPoints[i].id})`, `${group2} (${idOfSelectedPoints[i].id})`],
            y: i===-1? evaluationOfD[2] : subjectsUtility[i],
            marker:{
              color: i===-1? ['orange', 'orange'] : [colors[i], colors[i]]
            },
            type: 'bar',
            name: 'Selection ' + idOfSelectedPoints[i].id
        };
        tracesUtilities.push(traceUtilities)
        let traceFairnessScores = {
            x: [`Fairness score (${idOfSelectedPoints[i].id})`],
            y: i===-1? [evaluationOfD[0]] : [fairnessScores[i]],
            marker:{
              color: i===-1? ['orange'] : [colors[i]]
            },
            type: 'bar',
            name: 'Selection ' + idOfSelectedPoints[i].id
        };
        tracesFairnessScores.push(traceFairnessScores)
    })
    
    
    return (
        <div className='SubjectsUtility'>
            <h2>Decision subjects' utility for fairness score calculation</h2>
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
                        xaxis: {
                            automargin: true,
                        }
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
                        xaxis: {
                            automargin: true,
                        }
                    }

                }
            />
        </div>
      );
}

export default SubjectsUtility;