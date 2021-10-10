import React from 'react';
import Plot from 'react-plotly.js';
import './ScoreDistribution.css';

const ScoreDistribution = ({scores, thresholds, labels}) => {
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

      const threshold1 = {
        type: 'line',
        x0: thresholds[0],
        y0: 0,
        x1: thresholds[0],
        y1: 2000,
        line: {
          color: "rgba(98, 182, 239, 0.6)",
          width: 1.5,
          dash: 'dot'
        }
      }

      const threshold2 = {
        type: 'line',
        x0: thresholds[1],
        y0: 0,
        x1: thresholds[1],
        y1: 2000,
        line: {
          color: "rgba(255, 177, 101, 0.6)",
          width: 1.5,
          dash: 'dot'
        }
      }
      
      const data = [trace1, trace2];
      const layout = {
          barmode: "overlay", 
          title: "Score Distribution",
          shapes: [threshold1, threshold2],
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
        <Plot className='ScoreDistribution'
            data={data}
            layout={layout}
        />
      );
}

export default ScoreDistribution;