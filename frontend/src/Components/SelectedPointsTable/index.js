import React, {useState, useEffect} from 'react';
import './SelectedPointsTable.css';


function SelectedPointsTable({selectedPoints, setSelectedPoints, idOfSelectedPoints, setIdOfSelectedPoints}) {

  const tableDate = Object.values(idOfSelectedPoints).sort(function(a, b){
    return a.id-b.id
  })

  function renderTableHeader() {
    let header = Object.keys(tableDate[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

    
  function renderTableData() {

    console.log("testtt 2")
    console.log(selectedPoints)
    console.log("testtt 3")
    console.log(tableDate)
    
    return tableDate.map((tableRow, index) => {
      const { id, thresholdGroup0, thresholdGroup1, decisionMakerUtility, fairnessScore } = tableRow //destructuring
      return (
          <tr key={id}>
            <td>{id}</td>
            <td>{thresholdGroup0}</td>
            <td>{thresholdGroup1}</td>
            <td>{decisionMakerUtility}</td>
            <td>{fairnessScore}</td>
          </tr>
      )
    })
  }

  function renderTable() {
    if (selectedPoints.length === 0) {
      return (<h4 id="nothingSelected">Nothing selected yet.</h4>)
    }
    else {
      return (
        <table id='selectedPoints'>
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
        </table>
        )
      }
  }

  return (
    <div>
        <h1 id='title'>Selected Decision Rules</h1>
        {renderTable()}
    </div>
  )
}



export default SelectedPointsTable;