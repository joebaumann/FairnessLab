import React from "react";
import { useDispatch } from 'react-redux';
import Header from '../Header';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Pages.css';
import { changeDmuFN, changeDmuFP, changeDmuTN, changeDmuTP } from "../../store/decisionMaker";
import { changeJustifier, changePattern, changeSuFN1, changeSuFN2, changeSuFP1, changeSuFP2, changeSuTN1, changeSuTN2, changeSuTP1, changeSuTP2 } from "../../store/fairnessScore";
import { changeDatasetSelection } from "../../store/dataset";

function COMPAS() {

  const dispatch = useDispatch ()

  function compasaudit() {
    dispatch(changeDatasetSelection('COMPAS'))
    dispatch(changeDmuTP(1))
    dispatch(changeDmuFP(-1))
    dispatch(changeDmuFN(-1))
    dispatch(changeDmuTN(1))
    dispatch(changeSuTP1(0))
    dispatch(changeSuFP1(-1))
    dispatch(changeSuFN1(0))
    dispatch(changeSuTN1(0))
    dispatch(changeSuTP2(0))
    dispatch(changeSuFP2(-1))
    dispatch(changeSuFN2(0))
    dispatch(changeSuTN2(0))
    dispatch(changeJustifier('y_0'))
    dispatch(changePattern('egalitarianism'))
  }

  function compasaudit1() {
    compasaudit()
    dispatch(changeSuFP1(-1))
  }

  function compasaudit2() {
    compasaudit()
    dispatch(changeSuFP1(-2))
  }

  return (
    <div>
      <Header title="COMPAS case study"/>
      <div className="Content">
        <p>
          Use these buttons to follow our COMPAS use case study:
        </p>
        Replication of <a href='https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing'  target='_blank'>ProPublica's audit</a>:
        <Button component={Link} to="/audit" onClick={compasaudit1}>
          Audit COMPAS "the old way"
        </Button>
        <br/>
        New insights:
        <Button component={Link} to="/audit" onClick={compasaudit2}>
          Audit COMPAS "the new way"
        </Button>
      </div>
    </div>
  );
}

export default COMPAS;