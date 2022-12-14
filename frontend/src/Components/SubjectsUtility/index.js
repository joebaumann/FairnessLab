import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import './SubjectsUtility.css';
import { getFairnessScoreDescription, getGroup1, getGroup2 } from '../../store/fairnessScore';
import { getEvaluationOfD, getFairnessScores, getIdOfSelectedPoints, getSelectedPoints, getSubjectsUtility } from '../../store/paretoPlot';


const SubjectsUtility = ({colors}) => {
    const group1 = useSelector(getGroup1);
    const group2 = useSelector(getGroup2);
    const subjectsUtility = useSelector(getSubjectsUtility);
    const fairnessScores = useSelector(getFairnessScores);
    const evaluationOfD = useSelector(getEvaluationOfD);
    const selectedPoints = useSelector(getSelectedPoints);
    const idOfSelectedPoints = useSelector(getIdOfSelectedPoints);

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
            <h2>Fairness score</h2>
            {selectedPoints.length === 0 && 
            <b>Select at least one point in the Pareto plot below to see something.<br/><br/></b>
            }
            <span>Here, you can see a direct comparison of the fairness scores (for the points selected in the Pareto plot below). The higher the score, the better the decision rule aligns with the configured fairness metric. The lower the score, the worse its alignment with the fairness metric is.</span>
            <Plot
                data={tracesFairnessScores}

                layout = {
                    {
                        title: `Fairness score`,
                        xaxis: {
                            automargin: true,
                        }
                    }

                }
            />
            <h2>Decision subjects' utilities</h2>
            <span>Here you can see a direct comparison of the decision subjects' average utilities (for the points selected in the Pareto plot below).</span>
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