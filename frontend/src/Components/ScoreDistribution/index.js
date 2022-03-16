import React from 'react';
import Plot from 'react-plotly.js';
import './ScoreDistribution.css';

const ScoreDistribution = ({scores, y, selectedPoints, thresholdTuples, labels, colors}) => {
    var indices_of_Y0_for_group1 = [];
    var indices_of_Y1_for_group1 = [];
    for(let i = 0; i < y[0].length; i++)
        if (y[0][i] === 0)
          indices_of_Y0_for_group1.push(i);
        else
          indices_of_Y1_for_group1.push(i);
    const group1_Y1 = [];
    indices_of_Y1_for_group1.forEach(i => group1_Y1.push(scores[0][i]));
    const group1_Y0 = [];
    indices_of_Y0_for_group1.forEach(i => group1_Y0.push(scores[0][i]));
    const trace_group1_Y1 = {
      y: group1_Y1,
      type: "histogram",
      name: 'Y=1',
      marker: {
        color: "rgba(30, 132, 201, 0.4)",
      },
      xaxis: 'x1',
      yaxis: 'y1',
    };
    const trace_group1_Y0 = {
      y: group1_Y0,
      type: "histogram",
      name: 'Y=0',
      marker: {
          color: "rgba(98, 182, 239, 0.4)",
      },
      xaxis: 'x1',
      yaxis: 'y1',
    };
    const dataGroup1 = [trace_group1_Y1, trace_group1_Y0]
    

    var indices_of_Y0_for_group2 = [];
    var indices_of_Y1_for_group2 = [];
    for(let i = 0; i < y[1].length; i++)
        if (y[1][i] === 0)
          indices_of_Y0_for_group2.push(i);
        else
          indices_of_Y1_for_group2.push(i);
    const group2_Y1 = [];
    indices_of_Y1_for_group2.forEach(i => group2_Y1.push(scores[1][i]));
    const group2_Y0 = [];
    indices_of_Y0_for_group2.forEach(i => group2_Y0.push(scores[1][i]));
    const trace_group2_Y1 = {
        y: group2_Y1,
        type: "histogram",
        name: 'Y=1',
        marker: {
           color: "rgba(207, 122, 37, 0.4)",
        },
        xaxis: 'x2',
        yaxis: 'y2',
    };
    const trace_group2_Y0 = {
      y: group2_Y0,
      type: "histogram",
      name: 'Y=0',
      marker: {
         color: "rgba(255, 177, 101, 0.4)",
      },
      xaxis: 'x2',
      yaxis: 'y2',
    };
    const dataGroup2 = [trace_group2_Y1, trace_group2_Y0]

    let threshold_lines1 = []
    let threshold_lines2 = []
    
    for (let s=0; s < selectedPoints.length; s++) {
      var selectedPoint = selectedPoints[s]
      var color = colors[selectedPoint]
      var threshold1 = {
        type: 'line',
        y0: thresholdTuples[selectedPoint][0],
        x0: 0,
        y1: thresholdTuples[selectedPoint][0],
        x1: 100,
        line: {
          color: color,
          width: 3,
          dash: 'dot'
        }
      }
      threshold_lines1.push(threshold1)

      var threshold2 = {
        type: 'line',
        y0: thresholdTuples[selectedPoint][1],
        x0: 0,
        y1: thresholdTuples[selectedPoint][1],
        x1: 80,
        line: {
          color: color,
          width: 3,
          dash: 'dot'
        }
      }
      threshold_lines2.push(threshold2)
    }

    const layoutGroup1 = {
      width: 400,
      height: 400,
      title: labels[0],
      barmode: "overlay",
      shapes: threshold_lines1,
      xaxis: {
          type: 'histogram',
          title: 'Frequency',
          autorange: 'reversed',
      },
      yaxis: {
        type: 'histogram',
        title: 'Probability score',
        range: [0, 1]
      },
      showlegend: true,
      legend: {
        x: 0,
        y: 1
      }
    };

    const layoutGroup2 = {
      width: 400,
      height: 400,
      title: labels[1],
      barmode: "overlay",
      shapes: threshold_lines2,
      xaxis: {
          type: 'histogram',
          title: 'Frequency'
      },
      yaxis: {
        type: 'histogram',
        title: 'Estimated repayment probability',
        range: [0, 1]
      },
      legend: {
        x: 1,
        y: 1
      }
    };

    return (
      <div className='ScoreDistribution'>
        <h1>Score distribution</h1>
        Individuals with probability scores above or equal to their group-specific threshold receive D=1. The others receive D=0.
        <br/>
        <Plot className='LeftPlot'
            data={dataGroup1}
            layout={layoutGroup1}
        />
        <Plot className='RightPlot'
            data={dataGroup2}
            layout={layoutGroup2}
        />
      </div>
      );
}

export default ScoreDistribution;