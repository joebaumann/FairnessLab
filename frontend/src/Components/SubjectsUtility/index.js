import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import './SubjectsUtility.css';
import { getGroup1, getGroup2 } from '../../store/fairnessScore';


const SubjectsUtility = ({subjectsUtility, fairnessScores, selectedPoints, colors, idOfSelectedPoints, evaluationOfD}) => {
    const group1 = useSelector(getGroup1);
    const group2 = useSelector(getGroup2);

    let tracesUtilities = []
    let tracesFairnessScores = []
    selectedPoints.forEach(i => {
        let traceUtilities = {
            x: [`${group1} (${idOfSelectedPoints[i]})`, `${group2} (${idOfSelectedPoints[i]})`],
            y: i===-1? evaluationOfD[2] : subjectsUtility[i],
            marker:{
              color: i===-1? ['orange', 'orange'] : [colors[i], colors[i]]
            },
            type: 'bar',
            name: 'Selection ' + idOfSelectedPoints[i]
        };
        tracesUtilities.push(traceUtilities)
        let traceFairnessScores = {
            x: [`Fairness score (${idOfSelectedPoints[i]})`],
            y: i===-1? [evaluationOfD[0]] : [fairnessScores[i]],
            marker:{
              color: i===-1? ['orange'] : [colors[i]]
            },
            type: 'bar',
            name: 'Selection ' + idOfSelectedPoints[i]
        };
        tracesFairnessScores.push(traceFairnessScores)
    })
    
    
    return (
        <div className='SubjectsUtility'>
            <h2>Decision subjects' utility for fairness score calculation</h2>
            {selectedPoints.length === 0 && 
            <b>Select at least one point in the pareto plot to see something.<br/><br/></b>
            }
            <span>Here you can see a direct comparison of the fairness scores for the selected points. The higher the score, the better the decision rule aligns with the configured fairness metric.</span>
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
            <br/>
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
        </div>
      );
}

export default SubjectsUtility;