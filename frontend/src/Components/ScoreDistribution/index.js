import React from 'react';
import Plot from 'react-plotly.js';
import './ScoreDistribution.css';
import threshold_tuples from '../../data_static/compas/static_pareto/threshold_tuples.json';

const ScoreDistribution = ({scores, selectedPoints, labels}) => {
    const trace1 = {
        x: scores[0],
        type: "histogram",
        name: labels[0],
        marker: {
           color: "rgba(98, 182, 239, 0.4)",
        },
      };
    const trace2 = {
        x: scores[1],
        type: "histogram",
        name: labels[1],
        marker: {
           color: "rgba(255, 177, 101, 0.4)",
        },
    };
    const data = [trace1, trace2];

    let threshold_lines = []
    
    for (let s=0; s < selectedPoints.length; s++) {
      var selectedPoint = selectedPoints[s]
      var threshold1 = {
        type: 'line',
        x0: threshold_tuples[selectedPoint][0],
        y0: 0,
        x1: threshold_tuples[selectedPoint][0],
        y1: 200,
        line: {
          color: "rgba(98, 182, 239, 0.6)",
          width: 1.5,
          dash: 'dot'
        }
      }
      threshold_lines.push(threshold1)

      var threshold2 = {
        type: 'line',
        x0: threshold_tuples[selectedPoint][1],
        y0: 0,
        x1: threshold_tuples[selectedPoint][1],
        y1: 200,
        line: {
          color: "rgba(255, 177, 101, 0.6)",
          width: 1.5,
          dash: 'dot'
        }
      }
      threshold_lines.push(threshold2)
    }

    const layout = {
      barmode: "overlay",
      shapes: threshold_lines,
      xaxis: {
          type: 'histogram',
          title: 'Estimated repayment probability'
      },
      yaxis: {
        type: 'histogram',
        title: 'Frequency'
      }
    };
    return (
      <div className='ScoreDistribution'>
        <h1>Score distribution</h1>
        <Plot
            data={data}
            layout={layout}
        />
      </div>
      );
}

export default ScoreDistribution;