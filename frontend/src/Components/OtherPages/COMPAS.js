import React from "react";
import Header from '../Header';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Pages.css';

function COMPAS() {
  return (
    <div>
      <Header title="COMPAS case study"/>
      <div className="Content">
        <p>
          Use these buttons to follow our COMPAS use case study.
        </p>
        <Button component={Link} to="/audit/compasaudit1">
          Audit COMPAS "the old way"
        </Button>
        <br/>
        <Button component={Link} to="/audit/compasaudit2">
          Audit COMPAS "the new way"
        </Button>
      </div>
    </div>
  );
}

export default COMPAS;