import React, { useState } from 'react';
import './Workflow.css';
import Header from '../Header';

import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import StorageIcon from '@material-ui/icons/Storage';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import FunctionsIcon from '@material-ui/icons/Functions';
import BarChartIcon from '@material-ui/icons/BarChart';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// creating the forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  /* active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  }, */
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    /* backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)', */
    border: '3px solid limegreen',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <StorageIcon />,
    2: <TextFieldsIcon />,
    3: <FunctionsIcon />,
    4: <BarChartIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
      {completed ? <CheckCircleTwoToneIcon style={{ position: "absolute", top: "12px", left: "59%", color: "limegreen" }} /> : null}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function getSteps() {
  return ['Choose dataset', 'Name labels', 'Utility function', 'Visualizations'];
}

function Step1(props) {

  const classes = useStyles();

  const handleChange = (event) => {
    // update state: currently selected dataset
    props.handleChangeDataset(event.target.value);
  };

  return (
    <div className="Step1">

      'Please select or add a dataset:'
      <br/>
      Selected: {props.dataset}
      <br/>

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

function getStepContent(activeStep, dataset, handleChangeDataset) {
  switch (activeStep) {
    case 0:
      return <Step1 dataset={dataset} handleChangeDataset={handleChangeDataset} />;
    case 1:
      return 'Please define the names of the following labels:';
    case 2:
      return 'Please define the utility function:';
    case 3:
      return 'Here we should display the visualizations...';
    default:
      return 'Unknown step';
  }
}

export function Workflow() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();
  
  const [dataset, setDataset] = useState(''); // step1 state
  
  const forceUpdate = useForceUpdate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    // handleNext(); // continue to the next step automatically as soon as the active step is completed
    forceUpdate(); // force the stepper to rerender after step has been marked as complete
  };

  const handleUncomplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = false;
    setCompleted(newCompleted);
    // handleNext(); // continue to the next step automatically as soon as the active step is uncompleted
    forceUpdate(); // force the stepper to rerender after step has been marked as uncomplete
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  const handleChangeDataset = (selectedDataset) => {
    // update state: currently selected dataset
    setDataset(selectedDataset);

    // update state: is the current step completed?
    console.log(`Selected dataset: ${selectedDataset}!`);
    if (selectedDataset === "") {
      // mark current step as completed
      handleUncomplete();
    }
    else {
      // mark current step as uncompleted
      handleComplete();

    }
  };

  return (
    <>

      <div className="Worflow">
        <Header title="Complete all steps..." />
      </div>

      <div className={classes.root}>
        <Stepper nonLinear alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                completed={completed[index]}
              >
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <div>
          {allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep, dataset, handleChangeDataset)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUncomplete}
                      >
                        Uncomplete Step Manually
                      </Button>
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step Manually"}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default Workflow;