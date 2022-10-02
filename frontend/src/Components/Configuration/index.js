import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Configuration.css';
import '../../config';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { getDatasetSelection } from '../../store/dataset';
import { getDecisionMakerCurrency, changeDecisionMakerCurrency, changeDmuTP, changeDmuFP, changeDmuFN, changeDmuTN, getDmuTP, getDmuFP, getDmuFN, getDmuTN } from '../../store/decisionMaker';
import { getSubjectsCurrency, changeSubjectsCurrency, getSuTP1, changeSuTP1, getSuFP1, changeSuFP1, getSuFN1, changeSuFN1, getSuTN1, changeSuTN1, getSuTP2, changeSuTP2, getSuFP2, changeSuFP2, getSuFN2, changeSuFN2, getSuTN2, changeSuTN2, getGroup1, changeGroup1, getGroup2, changeGroup2, getPattern, changePattern, changeJustifier, getJustifier, getSufficientarianismThreshold, getPrioritarianismWeight, changeSufficientarianismThreshold, changePrioritarianismWeight } from '../../store/fairnessScore';
import { getD0Description, getD1Description, getY0Description, getY1Description } from '../../store/terminology';

function Configuration({demo}) {

    const dispatch = useDispatch ()
    function setDecisionMakerCurrency(currency) {dispatch(changeDecisionMakerCurrency(currency))}
    function setDmuTP(value) {dispatch(changeDmuTP(value))}
    function setDmuFP(value) {dispatch(changeDmuFP(value))}
    function setDmuFN(value) {dispatch(changeDmuFN(value))}
    function setDmuTN(value) {dispatch(changeDmuTN(value))}
    function setSubjectsCurrency(currency) {dispatch(changeSubjectsCurrency(currency))}
    function setSuTP1(value) {dispatch(changeSuTP1(value))}
    function setSuFP1(value) {dispatch(changeSuFP1(value))}
    function setSuFN1(value) {dispatch(changeSuFN1(value))}
    function setSuTN1(value) {dispatch(changeSuTN1(value))}
    function setSuTP2(value) {dispatch(changeSuTP2(value))}
    function setSuFP2(value) {dispatch(changeSuFP2(value))}
    function setSuFN2(value) {dispatch(changeSuFN2(value))}
    function setSuTN2(value) {dispatch(changeSuTN2(value))}
    function setGroup1(value) {dispatch(changeGroup1(value))}
    function setGroup2(value) {dispatch(changeGroup2(value))}
    function setJustifier(value) {dispatch(changeJustifier(value))}
    function setPattern(value) {dispatch(changePattern(value))}
    function setSufficientarianismThreshold(value) {dispatch(changeSufficientarianismThreshold(value))}
    function setPrioritarianismWeight(value) {dispatch(changePrioritarianismWeight(value))}
    
    const datasetSelection = useSelector(getDatasetSelection)
    const decisionMakerCurrency = useSelector(getDecisionMakerCurrency)
    const subjectsCurrency = useSelector(getSubjectsCurrency)
    const y0description = useSelector(getY0Description)
    const y1description = useSelector(getY1Description)
    const d0description = useSelector(getD0Description)
    const d1description = useSelector(getD1Description)
    const dmuTP = useSelector(getDmuTP);
    const dmuFP = useSelector(getDmuFP);
    const dmuFN = useSelector(getDmuFN);
    const dmuTN = useSelector(getDmuTN);
    const suTP1 = useSelector(getSuTP1)
    const suFP1 = useSelector(getSuFP1);
    const suFN1 = useSelector(getSuFN1);
    const suTN1 = useSelector(getSuTN1);
    const suTP2 = useSelector(getSuTP2);
    const suFP2 = useSelector(getSuFP2);
    const suFN2 = useSelector(getSuFN2);
    const suTN2 = useSelector(getSuTN2);
    const group1 = useSelector(getGroup1);
    const group2 = useSelector(getGroup2);
    const justifier = useSelector(getJustifier);
    const pattern = useSelector(getPattern);
    const sufficientarianismThreshold = useSelector(getSufficientarianismThreshold);
    const prioritarianismWeight = useSelector(getPrioritarianismWeight);

    const [correspondingFairnessMetric, setCorrespondingFairnessMetric] = useState(undefined);
    const [correspondingWeightedFairnessMetric, setCorrespondingWeightedFairnessMetric] = useState(undefined);
    const [open, setOpen] = React.useState(false);
    
    const handleClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
    };
    
    const handleSnackbar = () => {
        setOpen(true);
    };

    function updateCorrespondsToExistingMetric() {
        if (pattern === 'egalitarianism') {
            if (justifier === 'no_justifier' && suTP1 === suFP1 && Math.abs(suFP1 - suFN1) === 1 && suFN1 === suTN1 && suTP1 === suTP2 && suTN1 === suTN2 && suFP1 === suFP2 && suFN1 === suFN2) {
                setCorrespondingFairnessMetric('statistical parity')
                return
            }
            if (justifier === 'y_0' && Math.abs(suFP1 - suTN1) === 1 && suFP1 === suFP2 && suTN1 === suTN2) {
                setCorrespondingFairnessMetric('false positive rate parity')
                return
            }
            if (justifier === 'y_1' && Math.abs(suTP1 - suFN1) === 1 && suTP1 === suTP2 && suFN1 === suFN2) {
                setCorrespondingFairnessMetric('true positive rate parity AKA equality of opportunity')
                return
            }
            if (justifier === 'd_0' && Math.abs(suFN1 - suTN1) === 1 && suTN1 === suTN2 && suFN1 === suFN2) {
                setCorrespondingFairnessMetric('negative predictive value parity')
                return
            }
            if (justifier === 'd_1' && Math.abs(suTP1 - suFP1) === 1 && suTP1 === suTP2 && suFP1 === suFP2) {
                setCorrespondingFairnessMetric('positive predictive value parity AKA predictive parity')
                return
            }
            // config is not equivalent to any existing metric
            // check if it is a weighted version of an existing metric
            if (justifier === 'no_justifier' && suTP1 === suFP1 && suFP1 !== suFN1 && suFN1 === suTN1 && suTP1 === suTP2 && suTN1 === suTN2 && suFP1 === suFP2 && suFN1 === suFN2) {
                setCorrespondingWeightedFairnessMetric('statistical parity multiplied by ' + Math.abs(suFP1 - suFN1));
                return
            }
            if (justifier === 'y_0' && suFP1 !== suTN1 && suFP1 === suFP2 && suTN1 === suTN2) {
                setCorrespondingWeightedFairnessMetric('false positive rate parity multiplied by ' + Math.abs(suFP1 - suTN1));
                return
            }
            if (justifier === 'y_1' && suTP1 !== suFN1 && suTP1 === suTP2 && suFN1 === suFN2) {
                setCorrespondingWeightedFairnessMetric('true positive rate parity AKA equality of opportunity multiplied by ' + Math.abs(suTP1 - suFN1));
                return
            }
            if (justifier === 'd_0' && suFN1 !== suTN1 && suTN1 === suTN2 && suFN1 === suFN2) {
                setCorrespondingWeightedFairnessMetric('negative predictive value parity multiplied by ' + Math.abs(suFN1 - suTN1));
                return
            }
            if (justifier === 'd_1' && suTP1 !== suFP1 && suTP1 === suTP2 && suFP1 === suFP2) {
                setCorrespondingWeightedFairnessMetric('positive predictive value parity AKA predictive parity multiplied by ' + Math.abs(suTP1 - suFP1));
                return
            }
        }
        setCorrespondingFairnessMetric(undefined)
        setCorrespondingWeightedFairnessMetric(undefined)
    }

    function getSnackbarMessage() {
        return (
            <>
            {correspondingFairnessMetric !== undefined ?
                <div>The fairness metric you selected corresponds to <b><i>{correspondingFairnessMetric}</i></b>.</div>
                :
                <>
                {correspondingWeightedFairnessMetric !== undefined &&
                    <div>The fairness metric you selected corresponds to a weighted version of <b><i>{correspondingWeightedFairnessMetric}</i></b>.</div>
                }
                </>
            }
            </>
        )
    }

    useEffect(() => {
        setGroup1(global.config.datasets[datasetSelection]['group1'])
        setGroup2(global.config.datasets[datasetSelection]['group2'])
        setDecisionMakerCurrency(global.config.datasets[datasetSelection]['unit_DM'])
        setSubjectsCurrency(global.config.datasets[datasetSelection]['unit_DS'])
    }, [datasetSelection]);

    useEffect(() => {
        if (demo === "compasaudit1" || demo === "compasaudit2") {
            setDmuTP(0)
            setDmuFP(-1)
            setDmuFN(-1)
            setDmuTN(0)
            setSuFP2(-2)
            setJustifier('y_0')
            if (demo === "compasaudit1") {
                setSuFP1(-1)
            } else if (demo === "compasaudit2") {
                setSuFP1(-2)
            }
        }
    }, [demo]);
    
    useEffect(() => {
        updateCorrespondsToExistingMetric()
    }, [suTP1, suFP1, suFN1, suTN1, suTP2, suFP2, suFN2, suTN2, pattern, justifier])

    useEffect(() => {
        if (correspondingFairnessMetric !== undefined | correspondingWeightedFairnessMetric !== undefined) {
            handleSnackbar()
        }
        else {
            handleClose()
        }
    }, [correspondingFairnessMetric, correspondingWeightedFairnessMetric]);

    return (
        <div className='ParetoPlot'>
            <div className='ParetoConfiguration'>
                <h1>Configuration</h1>

                <h2>Decision maker's utility</h2>
                <b>How much utility does the decision maker derive from the decisions?</b>

                <h3>Currency of the decision maker</h3>
                <span>In what unit do you want to measure the utility of the decision maker (e.g., dollar, well-being)?</span>
                <input type="text" value={decisionMakerCurrency} onChange={(e) => setDecisionMakerCurrency(e.target.value)}/>

                <h3>Quantification of the decision maker's utility</h3>

                <UtilityQuantifier value={dmuTP} setSliderValue={setDmuTP} unit={decisionMakerCurrency} label={"How much utility does the decision-maker derive from " + y1description + " that is getting " + d1description + "?"}/>
                <UtilityQuantifier value={dmuFP} setSliderValue={setDmuFP} unit={decisionMakerCurrency} label={"How much utility does the decision-maker derive from " + y0description + " that is getting " + d1description + "?"}/>
                <UtilityQuantifier value={dmuFN} setSliderValue={setDmuFN} unit={decisionMakerCurrency} label={"How much utility does the decision-maker derive from " + y1description + " that is getting " + d0description + "?"}/>
                <UtilityQuantifier value={dmuTN} setSliderValue={setDmuTN} unit={decisionMakerCurrency} label={"How much utility does the decision-maker derive from " + y0description + " that is getting " + d0description + "?"}/>


                <h2>Fairness score</h2>
                <b>How should the utility of the decision subjects be distributed?</b>
                
                <h3>Socio-demographic groups</h3>
                <div>Which socio-demographic groups do you want to compare?</div>

                <label htmlFor="group1">Group 1</label>
                <input type="text" id="group1" value={group1} onChange={(e) => setGroup1(e.target.value)}/>
                <br/>
                <label htmlFor="group2">Group 2</label>
                <input type="text" id="group2" value={group2} onChange={(e) => setGroup2(e.target.value)}/>

                <h3>Claims differentiator (or justifier)</h3>
                <p>Do the socio-demographic groups have the same moral claims to utility or is it only a subgroup of them? For example, one could argue that the subgroup of people with Y=1 is deserves a higher (or lower) utility than people with Y=0.</p>
                <div>Define the subgroup in which people are deserving of the same amount of utility:</div>

                <div onChange={(e) => setJustifier(e.target.value)}>
                    <input type="radio" value="no_justifier" name="justifier" defaultChecked={justifier === 'no_justifier'} /> None
                    <input type="radio" value="y_0" name="justifier" defaultChecked={justifier === 'y_0'} /> Y=0
                    <input type="radio" value="y_1" name="justifier" defaultChecked={justifier === 'y_1'} /> Y=1
                    <input type="radio" value="d_0" name="justifier" defaultChecked={justifier === 'd_0'} /> D=0
                    <input type="radio" value="d_1" name="justifier" defaultChecked={justifier === 'd_1'} /> D=1
                </div>

                <h3>Decision subjects' utility</h3>
                <div>How much utility do the decision subjects derive from the decisions?</div>

                <h4>Currency of decision subjects</h4>
                <span>In what unit do you want to measure the utility of the decision subject (e.g., dollar, well-being)?</span>
                <input type="text" value={subjectsCurrency} onChange={(e) => setSubjectsCurrency(e.target.value)}/>

                <h4>Quantification of the decision subjects' utility</h4>

                {justifier !== 'no_justifier' &&
                    <div>Having a justifier means that the utility of some individuals is not considered when evaluating the fairness of the model. Sliders are disabled if their value is not considered for the evaluation.</div>
                }

                <h5>For the group: {group1}</h5>

                <UtilityQuantifier value={suTP1} setSliderValue={setSuTP1} disabled={justifier==="y_0" || justifier==="d_0"} unit={subjectsCurrency} label={"How much utility does " + y1description + " derive from getting " + d1description + "?"}/>
                <UtilityQuantifier value={suFP1} setSliderValue={setSuFP1} disabled={justifier==="y_1" || justifier==="d_0"} unit={subjectsCurrency} label={"How much utility does " + y0description + " derive from getting " + d1description + "?"}/>
                <UtilityQuantifier value={suFN1} setSliderValue={setSuFN1} disabled={justifier==="y_0" || justifier==="d_1"} unit={subjectsCurrency} label={"How much utility does " + y1description + " derive from getting " + d0description + "?"}/>
                <UtilityQuantifier value={suTN1} setSliderValue={setSuTN1} disabled={justifier==="y_1" || justifier==="d_1"} unit={subjectsCurrency} label={"How much utility does " + y0description + " derive from getting " + d0description + "?"}/>

                <h5>For the group: {group2}</h5>

                <UtilityQuantifier value={suTP2} setSliderValue={setSuTP2} disabled={justifier==="y_0" || justifier==="d_0"} unit={subjectsCurrency} label={"How much utility does " + y1description + " derive from getting " + d1description + "?"}/>
                <UtilityQuantifier value={suFP2} setSliderValue={setSuFP2} disabled={justifier==="y_1" || justifier==="d_0"} unit={subjectsCurrency} label={"How much utility does " + y0description + " derive from getting " + d1description + "?"}/>
                <UtilityQuantifier value={suFN2} setSliderValue={setSuFN2} disabled={justifier==="y_0" || justifier==="d_1"} unit={subjectsCurrency} label={"How much utility does " + y1description + " derive from getting " + d0description + "?"}/>
                <UtilityQuantifier value={suTN2} setSliderValue={setSuTN2} disabled={justifier==="y_1" || justifier==="d_1"} unit={subjectsCurrency} label={"How much utility does " + y0description + " derive from getting " + d0description + "?"}/>
                
                <h3>Pattern of Justice</h3>
                <div>How should the utility be distributed between the socio-demographic groups?</div><br/>
                <div><b>Egalitarianism</b>: Fairness is if individuals in both groups are expected to derive the same utility from the decision rule. Equality in itself is valued.</div>
                <div>→ Measured as: <b>How close are the average utilities to being equal?</b></div>
                <div><b>Maximin</b>: Fairness is if the average utility of the worst-off group is maximized by the decision rule. Inequalities are okay if they benefit the worst-off group.</div>
                <div>→ Measured as: <b>What’s the lowest average utility?</b></div>
                <div><b>Prioritarianism</b>: Fairness is if the aggregated utility of the groups is maximized by the decision rule, with the utility of the worst-off group being weighted higher than the other groups' utilities.</div>
                <div>→ Measured as: <b>What’s the aggregated utility with the worst-off group having a higher weight?</b></div>
                <div><b>Sufficientarianism</b>: Fairness is if all groups' have an average utility that is above the defined threshold. Inequalities are okay if every group is above the defined threshold.</div>
                <div>→ Measured as: <b>How many groups are above the defined threshold?</b></div>
                <br/>

                <label htmlFor="pattern">Choose a pattern:</label>
                <select name="pattern" id="pattern" onChange={(e) => setPattern(e.target.value)}>
                <option value="egalitarianism">egalitarianism</option>
                <option value="maximin">maximin</option>
                <option value="prioritarianism">prioritarianism</option>
                <option value="sufficientarianism">sufficientarianism</option>
                </select>

                {pattern === 'sufficientarianism' &&
                    <div>
                        <label htmlFor="sufficientarianismThreshold">Minimum average group utility</label>
                        <input type="number" id="sufficientarianismThreshold" value={sufficientarianismThreshold} onChange={(e) => setSufficientarianismThreshold(e.target.value)}/>
                    </div>
                }

                {pattern === 'prioritarianism' &&
                    <div>
                        <label htmlFor="prioritarianismWeight">Weight for worst-off group</label>
                        <input type="number" id="prioritarianismWeight" value={prioritarianismWeight} onChange={(e) => setPrioritarianismWeight(e.target.value)}/>
                    </div>
                }

                <Snackbar
                    anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                    }}
                    open={open}
                    autoHideDuration={10000}
                    message={getSnackbarMessage()}
                    onClose={handleClose}
                    action={
                    <React.Fragment>
                        <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                        >
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }/>
            </div>
        </div>
      );
}

function UtilityQuantifier({value, setSliderValue, label, unit, disabled}) {
    var numberRegex = /[-+]?[0-9]+\.?[0-9]+/
    var unitRegex = /[^\d+]+$/;
    var multiplierRegex = /^\*\s*\d+/;
    const [currentSliderValue, setCurrentSliderValue] = useState(Number(value))
    return (
        <div>
            <label>{label}</label>
            <br/>
            <input className="Slider" disabled={disabled} type="range" min="-10" max="10" step="0.1" value={currentSliderValue} onChange={(e) => setCurrentSliderValue(Number(e.target.value))} onMouseUp={(e) => setSliderValue(Number(e.target.value))} list="ticks" />
            <datalist id="ticks">
                <option>-10</option>
                <option>-9</option>
                <option>-8</option>
                <option>-7</option>
                <option>-6</option>
                <option>-5</option>
                <option>-4</option>
                <option>-3</option>
                <option>-2</option>
                <option>-1</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </datalist>
            <span className="sliderSpan">{currentSliderValue} {unit}</span>
            {unit.match(multiplierRegex) !== null && 
            <span> = {Math.round(currentSliderValue * unit.match(numberRegex) * 100) / 100}{unit.match(unitRegex)}</span>}
        </div>
      );
}

export default Configuration;