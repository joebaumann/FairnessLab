import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import './ParetoPlot.css';

const ParetoPlot = ({scores, labels, group1, setGroup1, group2, setGroup2}) => {
    const [dmuTP, setDmuTP] = useState(1);
    const [dmuFP, setDmuFP] = useState(0);
    const [dmuFN, setDmuFN] = useState(0);
    const [dmuTN, setDmuTN] = useState(1);
    const [suTP, setSuTP] = useState(1);
    const [suFP, setSuFP] = useState(1);
    const [suFN, setSuFN] = useState(0);
    const [suTN, setSuTN] = useState(0);
    const [decisionMakerCurrency, setDecisionMakerCurrency] = useState('CHF');
    const [subjectsCurrency, setSubjectsCurrency] = useState('');
    
    return (
        <div className='ParetoConfiguration'>
            <h1>Configuration</h1>
            <h2>Decision-maker utility</h2>
            <h5>How much utility does the decision-maker derive from the decisions?</h5>

            <h3>Currency of the decision-maker</h3>
            <label for="currency">In what unit do you want to measure the utility of the decision-maker?</label>
            <input type="text" id="currency" value={decisionMakerCurrency} onChange={(e) => setDecisionMakerCurrency(e.target.value)}/>

            <h3>Quantification of the decision-maker's utility</h3>

            <UtilityQuantifier value={dmuTP} setSliderValue={setDmuTP} unit={decisionMakerCurrency} label="TP: How much utility does the decision-maker derive from giving a positive decision to someone with Y=1?"/>
            <UtilityQuantifier value={dmuFP} setSliderValue={setDmuFP} unit={decisionMakerCurrency} label="FP: How much utility does the decision-maker derive from giving a positive decision to someone with Y=0?"/>
            <UtilityQuantifier value={dmuFN} setSliderValue={setDmuFN} unit={decisionMakerCurrency} label="FN: How much utility does the decision-maker derive from giving a negative decision to someone with Y=1?"/>
            <UtilityQuantifier value={dmuTN} setSliderValue={setDmuTN} unit={decisionMakerCurrency} label="TN: How much utility does the decision-maker derive from giving a negative decision to someone with Y=0?"/>

            <h2>Fairness score</h2>
            <h5>How much utility do the people affected by the decisions derive from these decisions?</h5>

            <h3>Currency of justice</h3>
            <label for="currency">In what unit do you want to measure the utility of the people subjected to the decisions?</label>
            <input type="text" id="currency" value={subjectsCurrency} onChange={(e) => setSubjectsCurrency(e.target.value)}/>

            <h3>Quantification of the affected individuals' utility</h3>

            <UtilityQuantifier value={suTP} setSliderValue={setSuTP} unit={subjectsCurrency} label="TP: How much utility does an individual with Y=1 derive from getting a positive decision?"/>
            <UtilityQuantifier value={suFP} setSliderValue={setSuFP} unit={subjectsCurrency} label="FP: How much utility does an individual with Y=0 derive from getting a positive decision?"/>
            <UtilityQuantifier value={suFN} setSliderValue={setSuFN} unit={subjectsCurrency} label="FN: How much utility does an individual with Y=1 derive from getting a negative decision?"/>
            <UtilityQuantifier value={suTN} setSliderValue={setSuTN} unit={subjectsCurrency} label="TN: How much utility does an individual with Y=0 derive from getting a negative decision?"/>

            <h3>Pattern of Justice</h3>

            <div>We will, for now, just assume that equality is our pattern of choice.</div>

            <h3>Socio-demographic groups</h3>
            <h5>Which socio-demographic groups do you want to compare?</h5>

            <label for="group1">Group 1</label>
            <input type="text" id="group1" value={group1} onChange={(e) => setGroup1(e.target.value)}/>
            <br/>
            <label for="group2">Group 2</label>
            <input type="text" id="group2" value={group2} onChange={(e) => setGroup2(e.target.value)}/>
        </div>
      );
}

const UtilityQuantifier = ({value, setSliderValue, label, unit}) => {
    return (
        <div>
            <label>{label}</label>
            <br/>
            <input className="Slider" type="range" min="-10" max="10" step="0.1" value={value} onChange={(e) => setSliderValue(e.target.value)} list="ticks" />
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
            <span>{value} {unit}</span>
        </div>
      );
}

export default ParetoPlot;