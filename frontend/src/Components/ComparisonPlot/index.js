import React, { Component } from 'react';
import './ComparisonPlot.css';
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ComparisonPlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBar: {
                labels: props.labels,
                datasets: [
                  {
                    label: "in %",
                    data: props.data,
                    backgroundColor: [
                      "rgba(98,  182, 239,0.4)",
                      "rgba(255, 177, 101,0.4)",
                      "rgba(255, 134,159,0.4)",
                      "rgba(255, 218, 128,0.4)",
                      "rgba(113, 205, 205,0.4)",
                      "rgba(170, 128, 252,0.4)"                      
                    ],
                    borderWidth: 2,
                    borderColor: [
                      "rgba(98,  182, 239, 1)",
                      "rgba(255, 177, 101, 1)",
                      "rgba(255, 134, 159, 1)",
                      "rgba(255, 218, 128, 1)",
                      "rgba(113, 205, 205, 1)",
                      "rgba(170, 128, 252, 1)"
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
                      beginAtZero: true
                    }
                  }
                ]
              }
            }
          }
      }
    
    
  
  
    render() {
      return (
        <MDBContainer className="ComparisonPlot">
            <h3 className="mt-5">{this.props.ylabel}</h3>
            <span>{this.props.explanation}</span>
            <Bar className="Bar" data={this.state.dataBar} options={this.state.barChartOptions} />
        </MDBContainer>
      );
    }
  }

export default ComparisonPlot;