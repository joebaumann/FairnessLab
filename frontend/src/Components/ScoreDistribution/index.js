import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import './ScoreDistribution.css';
import { getGroup1, getGroup2 } from '../../store/fairnessScore';
import { getSelectedPoints, getThresholdTuples } from '../../store/paretoPlot';
import { getUnfilteredData } from '../../store/dataset';

const ScoreDistribution = ({colors}) => {
  const group1 = useSelector(getGroup1);
  const group2 = useSelector(getGroup2);
  const thresholdTuples = useSelector(getThresholdTuples)
  const unfilteredData = useSelector(getUnfilteredData);
  const selectedPoints = useSelector(getSelectedPoints);

  var indices_of_Y0_for_group1 = [];
  var indices_of_Y1_for_group1 = [];
  for(let i = 0; i < unfilteredData['y'][0].length; i++)
      if (unfilteredData['y'][0][i] === 0)
        indices_of_Y0_for_group1.push(i);
      else
        indices_of_Y1_for_group1.push(i);
  const group1_Y1 = [];
  indices_of_Y1_for_group1.forEach(i => group1_Y1.push(unfilteredData['scores'][0][i]));
  const group1_Y0 = [];
  indices_of_Y0_for_group1.forEach(i => group1_Y0.push(unfilteredData['scores'][0][i]));
  const trace_group1_Y1 = {
    y: group1_Y1,
    type: "histogram",
    name: 'Y=1',
    marker: {
      color: "rgba(30, 132, 201, 0.4)",
    },
  };
  const trace_group1_Y0 = {
    y: group1_Y0,
    type: "histogram",
    name: 'Y=0',
    marker: {
        color: "rgba(98, 182, 239, 0.4)",
    },
  };
  const dataGroup1 = [trace_group1_Y1, trace_group1_Y0]
  

  var indices_of_Y0_for_group2 = [];
  var indices_of_Y1_for_group2 = [];
  for(let i = 0; i < unfilteredData['y'][1].length; i++)
      if (unfilteredData['y'][1][i] === 0)
        indices_of_Y0_for_group2.push(i);
      else
        indices_of_Y1_for_group2.push(i);
  const group2_Y1 = [];
  indices_of_Y1_for_group2.forEach(i => group2_Y1.push(unfilteredData['scores'][1][i]));
  const group2_Y0 = [];
  indices_of_Y0_for_group2.forEach(i => group2_Y0.push(unfilteredData['scores'][1][i]));
  const trace_group2_Y1 = {
      y: group2_Y1,
      type: "histogram",
      name: 'Y=1',
      marker: {
          color: "rgba(207, 122, 37, 0.4)",
      },
  };
  const trace_group2_Y0 = {
    y: group2_Y0,
    type: "histogram",
    name: 'Y=0',
    marker: {
        color: "rgba(255, 177, 101, 0.4)",
    },
  };
  const dataGroup2 = [trace_group2_Y1, trace_group2_Y0]

  let threshold_lines1 = []
  let threshold_lines2 = []

  var linelength = 2
  for (let s=0; s < selectedPoints.length; s++) {
    var selectedPoint = selectedPoints[s]
    if (selectedPoint !== -1) {
      var color = colors[selectedPoint]
      var threshold1 = {
        type: 'line',
        xref: 'paper',
        y0: thresholdTuples[selectedPoint][0],
        x0: 0.05,
        y1: thresholdTuples[selectedPoint][0],
        x1: 1,
        line: {
          color: color,
          width: 3,
          dash: linelength + "px,20px"
        }
      }
      threshold_lines1.push(threshold1)
      
      var threshold2 = {
        type: 'line',
        xref: 'paper',
        y0: thresholdTuples[selectedPoint][1],
        x0: 0,
        y1: thresholdTuples[selectedPoint][1],
        x1: 0.95,
        line: {
          color: color,
          width: 3,
          dash: linelength + "px,20px"
        }
      }
      threshold_lines2.push(threshold2)
      linelength += 2
    }

  }

  const layoutGroup1 = {
    width: 400,
    height: 400,
    margin: {
      l: 50,
      r: 0,
      b: 50,
      t: 80,
      pad: 4
    },
    title: group1,
    barmode: "overlay",
    shapes: threshold_lines1,
    xaxis: {
        type: 'histogram',
        title: 'Frequency',
        autorange: 'reversed',
    },
    yaxis: {
      title: 'Probability score',
      range: [-0.05, 1.05]
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
    margin: {
      l: 0,
      r: 50,
      b: 50,
      t: 80,
      pad: 4
    },
    title: group2,
    barmode: "overlay",
    shapes: threshold_lines2,
    xaxis: {
        type: 'histogram',
        title: 'Frequency'
    },
    yaxis: {
      range: [-0.05, 1.05]
    },
    showlegend: true,
    legend: {
      x: 1,
      y: 1
    }
  };

  return (
    <div className='ScoreDistribution'>
      <h2>Score distribution</h2>
      {unfilteredData['scores'][0].length === 0 && unfilteredData['scores'][1].length === 0 ?
        <>This plot is only available if the audited dataset contains predicted scores. The current dataset does not have a column named 'scores.'</>
        :
        <>
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
        </>
      
      }
    </div>
    );
}

export default ScoreDistribution;