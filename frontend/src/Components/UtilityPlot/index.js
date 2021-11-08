import React, { Component } from 'react';
import './UtilityPlot.css';
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class UtilityPlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBar: {
              labels: ["Decision-maker"],
              datasets: [
                {
                  label: "in %",
                  data: [props.utility],
                  backgroundColor: [
                    "rgba(113, 205, 205,0.4)"
                  ],
                  borderWidth: 2,
                  borderColor: [
                    "rgba(113, 205, 205, 1)"
                  ]
                }
              ]
            },
            barChartOptions: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      display: true,
                      color: "rgba(0, 0, 0, 0.1)"
                    }
                  }
                ],
                yAxes: [
                  {
                    gridLines: {
                      display: true,
                      color: "rgba(0, 0, 0, 0.1)"
                    },
                    ticks: {
                      beginAtZero: true,
                      min: 0,
                      max: 1
                    }
                  }
                ]
              }
            }
          }
      }
    
    
  
  
    render() {
      return (
        <MDBContainer className="UtilityPlot">
          <h3 className="mt-5">Accuracy</h3>
          {/* <span>Zeigt den Anteil korrekter Vorhersagen über die Performance-Beurteilungen.</span> */}
          <span>Share of correct classifications.</span>
          <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
        </MDBContainer>
      );
    }
  }

export default UtilityPlot;