import React from 'react';
import Plot from 'react-plotly.js';
import './ScoreDistribution.css';
import threshold_tuples from '../../data_static/compas/static_pareto/threshold_tuples.json';

const ScoreDistribution = ({scores, selectedPoints, labels, colors}) => {
    const trace1 = {
        y: scores[0],
        type: "histogram",
        name: labels[0],
        marker: {
           color: "rgba(98, 182, 239, 0.4)",
        },
        xaxis: 'x1',
        yaxis: 'y1',
      };
    const trace2 = {
        y: scores[1],
        type: "histogram",
        name: labels[1],
        marker: {
           color: "rgba(255, 177, 101, 0.4)",
        },
        xaxis: 'x2',
        yaxis: 'y2',
    };
    const dataGroup1 = [trace1]
    const dataGroup2 = [trace2]

    let threshold_lines1 = []
    let threshold_lines2 = []
    
    for (let s=0; s < selectedPoints.length; s++) {
      var selectedPoint = selectedPoints[s]
      var color = colors[selectedPoint]
      var threshold1 = {
        type: 'line',
        y0: threshold_tuples[selectedPoint][0],
        x0: 0,
        y1: threshold_tuples[selectedPoint][0],
        x1: 200,
        line: {
          color: color,
          width: 1.5,
          dash: 'dot'
        }
      }
      threshold_lines1.push(threshold1)

      var threshold2 = {
        type: 'line',
        y0: threshold_tuples[selectedPoint][1],
        x0: 0,
        y1: threshold_tuples[selectedPoint][1],
        x1: 200,
        line: {
          color: color,
          width: 1.5,
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
        title: 'Estimated repayment probability',
        range: [0, 1]
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
      }
    };

    return (
      <div className='ScoreDistribution'>
        <h1>Score distribution</h1>
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