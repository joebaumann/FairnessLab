import React, { Component } from 'react';
import './WorkflowSteps.css';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export function Step1(props) {

  const classes = useStyles();

  const handleChange = (event) => {
    // update state: currently selected dataset
    props.handleChangeDataset(event.target.value);
  };

  return (
    <div className="Step1">

      'Please select or add a dataset:'
      <br />
      Selected: {props.dataset}
      <br />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Dataset</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.dataset}
          onChange={handleChange}
          label="Dataset"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* TODO: use available datasets as selection items */}
          <MenuItem value={"dataset1"}>dataset1</MenuItem>
          <MenuItem value={"dataset2"}>dataset2</MenuItem>
          <MenuItem value={"dataset3"}>dataset3</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default Step1;