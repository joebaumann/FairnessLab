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
          Space for our blog post? Our link to it?
        </p>
        <Button component={Link} to="/audit/compasaudit1">
          COMPAS Audit 1
        </Button>
        <Button component={Link} to="/audit/compasaudit2">
          COMPAS Audit 2
        </Button>
      </div>
    </div>
  );
}

export default COMPAS;