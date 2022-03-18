import React, {useState, useEffect} from 'react';
import pf from 'pareto-frontier';
import Plot from 'react-plotly.js';
import './ParetoPlot.css';

function ParetoPlot({scores, y, group1, setGroup1, group2, setGroup2, numThresholds, setNumThresholds, selectedPoints, setSelectedPoints, colors, setColors, setSubjectsUtility, fairnessScores, setFairnessScores, thresholdTuples, setThresholdTuples}) {
    const [dmuTP, setDmuTP] = useState(1);
    const [dmuFP, setDmuFP] = useState(0);
    const [dmuFN, setDmuFN] = useState(0);
    const [dmuTN, setDmuTN] = useState(1);
    const [suTP, setSuTP] = useState(1);
    const [suFP, setSuFP] = useState(1);
    const [suFN, setSuFN] = useState(0);
    const [suTN, setSuTN] = useState(0);
    const [decisionMakerCurrency, setDecisionMakerCurrency] = useState('* 10k CHF');
    const [subjectsCurrency, setSubjectsCurrency] = useState('CHF');
    const [decisionMakerUtility, setDecisionMakerUtility] = useState([]);
    const [paretoOptimalPointsX, setParetoOptimalPointsX] = useState([]);
    const [paretoOptimalPointsY, setParetoOptimalPointsY] = useState([]);
    const [pattern, setPattern] = useState('egalitarianism');
    const [sufficientarianismThreshold, setSufficientarianismThreshold] = useState(0);
    const [prioritarianismWeight, setPrioritarianismWeight] = useState(2);

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function deselectAllPoints() {
        setSelectedPoints([])
        setColors(Array(numThresholds * numThresholds).fill('#4e87ad'))
    }

    function patternMapper(pattern) {
        let combination = null
        if (pattern === 'egalitarianism') {
            combination = absoluteDifference
        }
        if (pattern === 'maximin') {
            combination = Math.min
        } 
        if (pattern === 'prioritarianism') {
            combination = prioritarianSum
        }
        if (pattern === 'sufficientarianism') {
            combination = aboveThreshold
        }
        return combination
    }

    function countConfusion(decisions_array, decisions_value, y_array, y_value) {
        let count = 0;
        for(let i = 0; i < decisions_array.length; i++){
            if(decisions_array[i] === decisions_value && y_array[i] === y_value)
                count++;
        }
        return count
    }

    function utility(scores, threshold, y, parameter_calculation) {
        let decisions = []
        for(let i = 0; i < scores.length; i++){
            if(scores[i] >= threshold)
                decisions.push(1)
            else
                decisions.push(0)
        }
        let tp = countConfusion(decisions, 1, y, 1)
        let fp = countConfusion(decisions, 1, y, 0)
        let fn = countConfusion(decisions, 0, y, 1)
        let tn = countConfusion(decisions, 0, y, 0)

        let [ w_tp, w_fp, w_fn, w_tn ] = parameter_calculation
        let value = w_tp * tp + w_fp * fp + w_fn * fn + w_tn * tn

        return value
    }

    function averageUtility(scores, threshold, y, parameter_calculation) {
        let value = utility(scores, threshold, y, parameter_calculation)
        value = value / scores.length
        return value
    }

    function threshold(scores, threshold, y, parameter_calculation) {
        return threshold
    }

    function sum(value_A, value_B) {
        let sum = value_A + value_B
        return sum
    }

    function absoluteDifference(value_A, value_B) {
        let diff = Math.abs(value_A - value_B)
        return diff
    }

    function prioritarianSum(value_A, value_B) {
        if (value_A <= value_B) {
            return value_A * prioritarianismWeight + value_B
        }
        return value_A + value_B * prioritarianismWeight
    }

    function aboveThreshold(value_A, value_B) {
        let groups_above_threshold = 0
        if (value_A >= sufficientarianismThreshold)
            groups_above_threshold++
        if (value_B >= sufficientarianismThreshold)
            groups_above_threshold++
        return groups_above_threshold
    }

    function tuple(value_A, value_B) {
        return [value_A, value_B]
    }

    function calculateValues(numThresholds, scores, y, calculate_group_value, parameter_calculation) {
        let values = []
        for (let r = 0; r < numThresholds; r++) {
            let t = toThreshold(r, numThresholds)
            let value = calculate_group_value(scores, t, y, parameter_calculation)
            values.push(value)
        }
        return values
    }

    function combineThresholds(numThresholds, scores_A, scores_B, y_A, y_B, calculate_group_value, combine_group_values, parameter_calculation) {
        let values_A = calculateValues(numThresholds, scores_A, y_A, calculate_group_value, parameter_calculation)
        let values_B = calculateValues(numThresholds, scores_B, y_B, calculate_group_value, parameter_calculation)
        let values = []
        for (let r_A = 0; r_A < numThresholds; r_A++) {
            for (let r_B = 0; r_B < numThresholds; r_B++) {
                let value = combine_group_values(values_A[r_A], values_B[r_B])
                values.push(value)
            }
        }
        return values
    }

    function toThreshold(r, numThresholds) {
        let threshold = (1/(numThresholds-1)) * r
        return Math.round((threshold + Number.EPSILON) * 100) / 100
    }

    function updateThresholdCalculations() {
        setThresholdTuples(combineThresholds(numThresholds, scores[0], scores[1], y[0], y[1], threshold, tuple))
        setDecisionMakerUtility(combineThresholds(numThresholds, scores[0], scores[1], y[0], y[1], utility, sum, [dmuTP, dmuFP, dmuFN, dmuTN]))
        if (pattern === 'egalitarianism') {
            const unfairnessScores = combineThresholds(numThresholds, scores[0], scores[1], y[0], y[1], averageUtility, absoluteDifference, [suTP, suFP, suFN, suTN])
            const maxUnfairness = Math.max(...unfairnessScores)
            let fairnessScores = unfairnessScores.map(function(s, i) {
                return maxUnfairness - s;
            });
            setFairnessScores(fairnessScores)
        }
        else {
            let combineFunction = patternMapper(pattern)
            let fairnessScores = combineThresholds(numThresholds, scores[0], scores[1], y[0], y[1], averageUtility, combineFunction, [suTP, suFP, suFN, suTN])
            setFairnessScores(fairnessScores)
        }
        setSubjectsUtility(combineThresholds(numThresholds, scores[0], scores[1], y[0], y[1], averageUtility, tuple, [suTP, suFP, suFN, suTN]))
    }
   
    function updateParetoFront() {
        let points = fairnessScores.map(function(f, i) {
            return [f, decisionMakerUtility[i]];
        });
        let paretoOptimalPoints = pf.getParetoFrontier(points)
        let paretoX = paretoOptimalPoints.map(function(p, i) {
            return p[0];
        })
        setParetoOptimalPointsX(paretoX)
        let paretoY = paretoOptimalPoints.map(function(p, i) {
            return p[1];
        })
        setParetoOptimalPointsY(paretoY)
    }
    
    useEffect(() => {
        updateThresholdCalculations()
    }, [suTP, suFP, suFN, suTN, dmuTP, dmuFP, dmuFN, dmuTN, pattern, sufficientarianismThreshold, prioritarianismWeight, numThresholds]);

    useEffect(() => {
        updateParetoFront()
    }, [fairnessScores, decisionMakerUtility]);

    useEffect(() => {
        deselectAllPoints()
    }, [numThresholds]);

    useEffect(() => {
        updateParetoFront()
    }, []);

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
                <div>In what unit do you want to measure the utility of the decision maker?</div>
                <span>Note: Start with '*' to increase the range of the scale.</span>
                <input type="text" value={decisionMakerCurrency} onChange={(e) => setDecisionMakerCurrency(e.target.value)}/>

                <h3>Quantification of the decision maker's utility</h3>

                <UtilityQuantifier value={dmuTP} setSliderValue={setDmuTP} unit={decisionMakerCurrency} label="TP: How much utility does the decision-maker derive from giving a positive decision to someone with Y=1?"/>
                <UtilityQuantifier value={dmuFP} setSliderValue={setDmuFP} unit={decisionMakerCurrency} label="FP: How much utility does the decision-maker derive from giving a positive decision to someone with Y=0?"/>
                <UtilityQuantifier value={dmuFN} setSliderValue={setDmuFN} unit={decisionMakerCurrency} label="FN: How much utility does the decision-maker derive from giving a negative decision to someone with Y=1?"/>
                <UtilityQuantifier value={dmuTN} setSliderValue={setDmuTN} unit={decisionMakerCurrency} label="TN: How much utility does the decision-maker derive from giving a negative decision to someone with Y=0?"/>

                <h2>Decision subjects' utility</h2>
                <h5>How much utility do the decision subjects derive from the decisions?</h5>

                <h3>Currency of decision subjects</h3>
                <div>In what unit do you want to measure the utility of the decision subject?</div>
                <span>Note: Start with '*' to increase the range of the scale.</span>
                <input type="text" value={subjectsCurrency} onChange={(e) => setSubjectsCurrency(e.target.value)}/>

                <h3>Quantification of the decision subjects' utility</h3>

                <UtilityQuantifier value={suTP} setSliderValue={setSuTP} unit={subjectsCurrency} label="TP: How much utility does an individual with Y=1 derive from getting a positive decision?"/>
                <UtilityQuantifier value={suFP} setSliderValue={setSuFP} unit={subjectsCurrency} label="FP: How much utility does an individual with Y=0 derive from getting a positive decision?"/>
                <UtilityQuantifier value={suFN} setSliderValue={setSuFN} unit={subjectsCurrency} label="FN: How much utility does an individual with Y=1 derive from getting a negative decision?"/>
                <UtilityQuantifier value={suTN} setSliderValue={setSuTN} unit={subjectsCurrency} label="TN: How much utility does an individual with Y=0 derive from getting a negative decision?"/>

                <h2>Fairness score</h2>
                <h5>How should the utility of the decision subjects be distributed?</h5>
                
                <h3>Socio-demographic groups</h3>
                <div>Which socio-demographic groups do you want to compare?</div>

                <label for="group1">Group 1</label>
                <input type="text" id="group1" value={group1} onChange={(e) => setGroup1(e.target.value)}/>
                <br/>
                <label for="group2">Group 2</label>
                <input type="text" id="group2" value={group2} onChange={(e) => setGroup2(e.target.value)}/>
                
                <h3>Pattern of Justice</h3>
                {/* <div>For now, we will simply assume that <i>egalitarianism</i> is our pattern of choice. This means that we expect that the average utility of {group1} is equal to the average utility of {group2}.</div> */}
                
                <div>How should the utility be distributed between the socio-demographic groups?</div><br/>
                <div><b>Egalitarianism</b>: Requires equality between the average utilities.</div>
                <div><b>Maximin</b>: Demands that the average utility of the worst-off group is maximized.</div>
                <div><b>Sufficientarianism</b>: Decide on a threshold for the minimum average utility and try to bring as many groups as possible above this threshold.</div>
                <div><b>Prioritarianism</b>: Sum of the average utilities, where the utility of the worst-off group is weighted. Prioritarianism says that benefits for the worse off matter more than benefits for the better off.</div>
                <br/>

                <label for="pattern">Choose a pattern:</label>
                <select name="pattern" id="pattern" onChange={(e) => setPattern(e.target.value)}>
                <option value="egalitarianism">egalitarian</option>
                <option value="maximin">maximin</option>
                <option value="sufficientarianism">sufficientarian</option>
                <option value="prioritarianism">prioritarian</option>
                </select>

                {pattern === 'sufficientarianism' &&
                    <div>
                        <label for="sufficientarianismThreshold">Minimum average group utility</label>
                        <input type="number" id="sufficientarianismThreshold" value={sufficientarianismThreshold} onChange={(e) => setSufficientarianismThreshold(e.target.value)}/>
                    </div>
                }

                {pattern === 'prioritarianism' &&
                    <div>
                        <label for="prioritarianismWeight">Weight for worst-off group</label>
                        <input type="number" id="prioritarianismWeight" value={prioritarianismWeight} onChange={(e) => setPrioritarianismWeight(e.target.value)}/>
                    </div>
                }
            </div>
            <div className="ParetoPlots">
                <h1>Pareto plot</h1>
                With the decision maker utility and a fairness metric specified, we can take a simple approach to show the trade-offs between these metrics: We go through different decision rules and calculate the metrics associated with each of them, i.e., the decision maker's utility and the fairness score. For each decision rule, we then plot the associated decision maker’s utility and fairness score in a 2D plot. We use group-specific thresholds as decision rules.
                <br/><br/>
                <b>Decision maker's utility</b>: Higher is better (total utility for the {scores[0].length + scores[1].length} individuals in the dataset)
                <br/>
                <b>Fairness score</b>: Lower is better<br/>
                <br/>
                <label>Number of thresholds: How many thresholds do you want to test for each group?</label>
                <input type="text" value={numThresholds} onChange={(e) => setNumThresholds(e.target.value)}/>
                <br/><br/>
                <div>
                    <button onClick={deselectAllPoints}>
                        Deselect all points
                    </button>
                </div>


                <Plot
                    data={[
                    {
                        x: paretoOptimalPointsX,
                        y: paretoOptimalPointsY,
                        mode: 'lines',
                        name: 'Pareto front',
                        marker:{color: '#a61b62'}
                    },
                    {
                        x: fairnessScores,
                        y: decisionMakerUtility,
                        mode: 'markers',
                        marker:{color: colors},
                        type: 'scatter',
                        hovertemplate: '<b>Decision maker\'s utility</b>: %{y:.2f}' +
                        '<br><b>Fairness score</b>: %{x}<br>' +
                        '<b>Thresholds</b>: %{text}',
                        text: thresholdTuples,
                        name: 'Decision rules'
                    },
                    ]}

                    layout={ {
                        width: 1000,
                        height: 800,
                        xaxis: { title: `Fairness score<br>Difference in average utility of ${group1} and ${group2} (in ${subjectsCurrency.replace('*', '')})<br>|average_utility(${group1}) - average_utility(${group2})|<br>where average_utility=(${suTP} * #TP + ${suFP} * #FP + ${suFN} * #FN + ${suTN} * #TN) / group_size` },
                        yaxis: { title: `Decision maker's utility (in ${decisionMakerCurrency.replace('*', '')})` },
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
                        setColors(newColors)
                        setSelectedPoints([...selectedPoints]);
                      }}
                />
            </div>
        </div>
      );
}

function UtilityQuantifier({value, setSliderValue, label, unit}) {
    var numberRegex = /\d+/;
    var unitRegex = /[^\d+]+$/;
    var multiplierRegex = /^\*\s*\d+/;
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
            {unit.match(multiplierRegex) !== null && 
            <span> = {Math.round(value * unit.match(numberRegex) * 100) / 100}{unit.match(unitRegex)}</span>}
        </div>
      );
}

export default ParetoPlot;