import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import './ParetoPlot.css';
import decisionmaker_utility from '../../data_static/compas/static_pareto/decisionmaker_utility.json';
import fairness_score from '../../data_static/compas/static_pareto/fairness_score.json';
import threshold_tuples from '../../data_static/compas/static_pareto/threshold_tuples.json';

const ParetoPlot = ({scores, labels, group1, setGroup1, group2, setGroup2, numThresholds, setNumThresholds, selectedPoints, setSelectedPoints, colors, setColors}) => {
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

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function deselectAll() {
        setSelectedPoints([])
        setColors(Array(decisionmaker_utility.length).fill('#4e87ad'))
    }
    
    return (
        <div className='ParetoPlot'>
            <div className='ParetoConfiguration'>
                <h1>Terminology</h1>
                <b>Y</b>: The "ground truth"; not known at prediction time.
                <br/>
                <b>D</b>: The decision in question; relies on Y to make this decision.
                <br/><br/>
                
                <b>Decision maker</b>: The people or organization designing the algorithm, deciding on its design and thereby ultimately taking the decisions in question.
                <br/>
                <b>Decision subjects</b>: The people subjected to the decisions of the algorithm. They may or may not be aware that this algorithm is being deployed and used to make decisions about them.
                

                <h1>Configuration</h1>

                <h2>Decision maker's utility</h2>
                <h5>How much utility does the decision maker derive from the decisions?</h5>

                <h3>Currency of the decision maker</h3>
                <label for="currency">In what unit do you want to measure the utility of the decision maker?</label>
                <input type="text" id="currency" value={decisionMakerCurrency} onChange={(e) => setDecisionMakerCurrency(e.target.value)}/>

                <h3>Quantification of the decision maker's utility</h3>

                <UtilityQuantifier value={dmuTP} setSliderValue={setDmuTP} unit={decisionMakerCurrency} label="TP: How much utility does the decision-maker derive from giving a positive decision to someone with Y=1?"/>
                <UtilityQuantifier value={dmuFP} setSliderValue={setDmuFP} unit={decisionMakerCurrency} label="FP: How much utility does the decision-maker derive from giving a positive decision to someone with Y=0?"/>
                <UtilityQuantifier value={dmuFN} setSliderValue={setDmuFN} unit={decisionMakerCurrency} label="FN: How much utility does the decision-maker derive from giving a negative decision to someone with Y=1?"/>
                <UtilityQuantifier value={dmuTN} setSliderValue={setDmuTN} unit={decisionMakerCurrency} label="TN: How much utility does the decision-maker derive from giving a negative decision to someone with Y=0?"/>

                <h2>Fairness score</h2>
                <h5>How should the utility of the decision subjects (i.e., the people subjected to the decisions) be distributed?</h5>

                <h3>Currency of decision subjects</h3>
                <label for="currency">In what unit do you want to measure the utility of the decision subjects?</label>
                <input type="text" id="currency" value={subjectsCurrency} onChange={(e) => setSubjectsCurrency(e.target.value)}/>

                <h3>Quantification of the decision subjects' utility</h3>

                <UtilityQuantifier value={suTP} setSliderValue={setSuTP} unit={subjectsCurrency} label="TP: How much utility does an individual with Y=1 derive from getting a positive decision?"/>
                <UtilityQuantifier value={suFP} setSliderValue={setSuFP} unit={subjectsCurrency} label="FP: How much utility does an individual with Y=0 derive from getting a positive decision?"/>
                <UtilityQuantifier value={suFN} setSliderValue={setSuFN} unit={subjectsCurrency} label="FN: How much utility does an individual with Y=1 derive from getting a negative decision?"/>
                <UtilityQuantifier value={suTN} setSliderValue={setSuTN} unit={subjectsCurrency} label="TN: How much utility does an individual with Y=0 derive from getting a negative decision?"/>

                <h3>Pattern of Justice</h3>

                <div>For now, we will simply assume that egalitarianism is our pattern of choice.</div>

                <h3>Socio-demographic groups</h3>
                <h5>Which socio-demographic groups do you want to compare?</h5>

                <label for="group1">Group 1</label>
                <input type="text" id="group1" value={group1} onChange={(e) => setGroup1(e.target.value)}/>
                <br/>
                <label for="group2">Group 2</label>
                <input type="text" id="group2" value={group2} onChange={(e) => setGroup2(e.target.value)}/>
            </div>
            <div className="ParetoPlots">
                <h1>Pareto plots</h1>
                <label>Number of thresholds</label>
                <input type="text" value={numThresholds} onChange={(e) => setNumThresholds(e.target.value)}/>

                <Plot
                    data={[
                    {
                        x: fairness_score,
                        y: decisionmaker_utility,
                        mode: 'markers',
                        marker:{color: colors},
                        type: 'scatter',
                        hovertemplate: '<b>Decision maker\'s utility</b>: %{y:.2f}' +
                        '<br><b>Fairness score</b>: %{x}<br>' +
                        '<b>Thresholds</b>: %{text}',
                        text: threshold_tuples,
                    },
                    ]}

                    layout={ {
                        width: 1000,
                        height: 500,
                        xaxis: { title: `Fairness score<br>1 - |utility(${group1}) - utility(${group2})|<br>where utility=(${suTP} * #TP + ${suFP} * #FP + ${suFN} * #FN + ${suTN} * #TN)` },
                        yaxis: { title: `Decision maker's utility` },
                        hovermode:'closest',
                    } }

                    onClick={(data) => {
                        var newColors = [...colors];
                        var selectedPoint = data.points[0].pointIndex
                        var indexOfSelectedPoint = selectedPoints.indexOf(selectedPoint)
                        if (indexOfSelectedPoint > -1) {
                            selectedPoints.splice(indexOfSelectedPoint, 1)
                            newColors[selectedPoint] = '#4e87ad'
                        } else {
                            selectedPoints.push(selectedPoint)
                            newColors[selectedPoint] = getRandomColor()
                        }
                        console.log(selectedPoints)
                        setColors(newColors)
                        setSelectedPoints([...selectedPoints]);
                      }}
                />

                <div>
                    <button onClick={deselectAll}>
                        Deselect all points
                    </button>
                </div>
            </div>
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