import React, {useState, useEffect} from 'react';
import pf from 'pareto-frontier';
import Plot from 'react-plotly.js';
import './ParetoPlot.css';
import '../../config';

function ParetoPlot({filteredData, unfilteredData, group1, setGroup1, group2, d0description, setd0description, d1description, setd1description, y0description, sety0description, y1description, sety1description, setGroup2, datasetSelection, numThresholds, setNumThresholds, selectedPoints, setSelectedPoints, idOfSelectedPoints, setIdOfSelectedPoints, incrementalSelectionId, setIncrementalSelectionId, colors, setColors, setSubjectsUtility, fairnessScores, setFairnessScores, thresholdTuples, setThresholdTuples, decisionMakerCurrency, setDecisionMakerCurrency, subjectsCurrency, setSubjectsCurrency, justifier, setJustifier, datasetSelectionCounter, evaluationOfD, setEvaluationOfD}) {
    const [dmuTP, setDmuTP] = useState(1);
    const [dmuFP, setDmuFP] = useState(0);
    const [dmuFN, setDmuFN] = useState(0);
    const [dmuTN, setDmuTN] = useState(1);
    const [suTP1, setSuTP1] = useState(1);
    const [suFP1, setSuFP1] = useState(1);
    const [suFN1, setSuFN1] = useState(0);
    const [suTN1, setSuTN1] = useState(0);
    const [suTP2, setSuTP2] = useState(1);
    const [suFP2, setSuFP2] = useState(1);
    const [suFN2, setSuFN2] = useState(0);
    const [suTN2, setSuTN2] = useState(0);
    const [decisionMakerUtility, setDecisionMakerUtility] = useState([]);
    const [paretoOptimalPointsX, setParetoOptimalPointsX] = useState([]);
    const [paretoOptimalPointsY, setParetoOptimalPointsY] = useState([]);
    const [correspondingFairnessMetric, setCorrespondingFairnessMetric] = useState(undefined);
    const [colorOfD, setColorOfD] = useState('#fff')
    const [pattern, setPattern] = useState('egalitarianism');
    const [xAxisLabel, setXAxisLabel] = useState(null);
    const [sufficientarianismThreshold, setSufficientarianismThreshold] = useState(0.5);
    const [prioritarianismWeight, setPrioritarianismWeight] = useState(2);

    function getRandomColor() {
        // get a random color while avoiding yellow and colors that are too light
        let hue = ~~(360 * Math.random())
        while (hue >= 51 && hue <= 60) {
            hue = ~~(360 * Math.random())
        }
        return `hsla(${hue},80%,50%,0.8)`
    }

    function deselectAllPoints() {
        setSelectedPoints([])
        setIdOfSelectedPoints({})
        setIncrementalSelectionId(1)
        setColors(Array(numThresholds * numThresholds).fill('#ffffff'))
        setColorOfD('#fff')
        console.log('deselected all points')
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
        return calculateUtilityFromDecisions(decisions, y, parameter_calculation);
    }

    function calculateUtilityFromDecisions(decisions, y, parameter_calculation) {
        let tp = countConfusion(decisions, 1, y, 1);
        let fp = countConfusion(decisions, 1, y, 0);
        let fn = countConfusion(decisions, 0, y, 1);
        let tn = countConfusion(decisions, 0, y, 0);
    
        let [w_tp, w_fp, w_fn, w_tn] = parameter_calculation;
        let value = w_tp * tp + w_fp * fp + w_fn * fn + w_tn * tn;
    
        return value;
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

    function combineThresholds(numThresholds, scores_A, scores_B, y_A, y_B, calculate_group_value, combine_group_values, parameter_calculation_1, parameter_calculation_2) {
        let values_A = calculateValues(numThresholds, scores_A, y_A, calculate_group_value, parameter_calculation_1)
        let values_B = calculateValues(numThresholds, scores_B, y_B, calculate_group_value, parameter_calculation_2)
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
        if (filteredData['scores'][0].length === 0 && filteredData['scores'][1].length === 0) {
            setThresholdTuples([])
            setDecisionMakerUtility([])
            setFairnessScores([])
            setSubjectsUtility([])
            return 0
        } else {
            setThresholdTuples(combineThresholds(numThresholds, filteredData['scores'][0], filteredData['scores'][1], filteredData['y'][0], filteredData['y'][1], threshold, tuple))
            setDecisionMakerUtility(combineThresholds(numThresholds, unfilteredData['scores'][0], unfilteredData['scores'][1], unfilteredData['y'][0], unfilteredData['y'][1], utility, sum, [dmuTP, dmuFP, dmuFN, dmuTN], [dmuTP, dmuFP, dmuFN, dmuTN]))
            let combineFunction = patternMapper(pattern)
            let fairnessScores = combineThresholds(numThresholds, filteredData['scores'][0], filteredData['scores'][1], filteredData['y'][0], filteredData['y'][1], averageUtility, combineFunction, [suTP1, suFP1, suFN1, suTN1], [suTP2, suFP2, suFN2, suTN2])
            // TODO: Add evaluation of D here
            let maxUnfairness = undefined
            if (pattern === "egalitarianism") {
                maxUnfairness = Math.max(...fairnessScores)
                fairnessScores = fairnessScores.map(function(s, i) {
                    return maxUnfairness - s;
                });
            }
            setFairnessScores(fairnessScores)
            setSubjectsUtility(combineThresholds(numThresholds, filteredData['scores'][0], filteredData['scores'][1], filteredData['y'][0], filteredData['y'][1], averageUtility, tuple, [suTP1, suFP1, suFN1, suTN1], [suTP2, suFP2, suFN2, suTN2]))
            return maxUnfairness
        }
    }

    function updateEvaluationOfD(maxUnfairness) {
        if (filteredData['d'][0].length !== 0 || filteredData['d'][1].length !== 0) {
            let decisionMakerUtility_A = calculateUtilityFromDecisions(unfilteredData['d'][0], unfilteredData['y'][0], [dmuTP, dmuFP, dmuFN, dmuTN])
            let decisionMakerUtility_B = calculateUtilityFromDecisions(unfilteredData['d'][1], unfilteredData['y'][1], [dmuTP, dmuFP, dmuFN, dmuTN])
            let decisionMakerUtility = sum(decisionMakerUtility_A, decisionMakerUtility_B)
            let fairnessValue_A = calculateUtilityFromDecisions(filteredData['d'][0], filteredData['y'][0], [suTP1, suFP1, suFN1, suTN1]) / filteredData['d'][0].length
            let fairnessValue_B = calculateUtilityFromDecisions(filteredData['d'][1], filteredData['y'][1], [suTP2, suFP2, suFN2, suTN2]) / filteredData['d'][1].length
            let combineFunction = patternMapper(pattern)
            let fairnessScore = combineFunction(fairnessValue_A, fairnessValue_B)
            if (pattern === "egalitarianism") {
                fairnessScore = maxUnfairness - fairnessScore
            }
            setEvaluationOfD([fairnessScore, decisionMakerUtility, [fairnessValue_A, fairnessValue_B]])
        } else {
            setEvaluationOfD([])
        }
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

    function updateXAxisLabel() {
        let xaxislabel = 'Fairness score<br>'
        if (pattern === 'egalitarianism') {
            xaxislabel += `Maximum difference in average utility - absolute difference in average utility of ${group1} and ${group2} (in ${subjectsCurrency.replace('*', '')})`
        }
        if (pattern === 'maximin') {
            xaxislabel += `Minimum average utility of ${group1} and ${group2} (in ${subjectsCurrency.replace('*', '')})`
        }
        if (pattern === 'sufficientarianism') {
            xaxislabel += `Number of groups with average utility above threshold (min: 0 groups, max: 2 groups)`
        }
        if (pattern === 'prioritarianism') {
            xaxislabel += `Weighted sum of average utilities of ${group1} and ${group2} (in ${subjectsCurrency.replace('*', '')})`
        }
        setXAxisLabel(xaxislabel)
    }

    function updateCorrespondsToExistingMetric() {
        if (pattern === 'egalitarianism') {
            if (justifier === 'no_justifier' && suTP1 === 1 && suTP2 === 1 && suFP1 === 1 && suFP2 === 1 && suFN1 === 0 && suFN2 === 0 && suTN1 === 0 && suTN2 === 0) {
                setCorrespondingFairnessMetric('statistical parity')
                return
            }
            if (justifier === 'y_0' && suFP1 === 1 && suFP2 === 1 && suTN1 === 0 && suTN2 === 0) {
                setCorrespondingFairnessMetric('false positive rate parity')
                return
            }
            if (justifier === 'y_1' && suTP1 === 1 && suTP2 === 1 && suFN1 === 0 && suFN2 === 0) {
                setCorrespondingFairnessMetric('equality of opportunity')
                return
            }
            if (justifier === 'd_0' && suFN1 === 0 && suFN2 === 0 && suTN1 === 0 && suTN2 === 0) {
                setCorrespondingFairnessMetric('negative predictive value parity')
                return
            }
            if (justifier === 'd_1' && suTP1 === 1 && suTP2 === 1 && suFP1 === 1 && suFP2 === 1) {
                setCorrespondingFairnessMetric('positive predictive value parity')
                return
            }
        }
        setCorrespondingFairnessMetric(undefined)
    }

    useEffect(() => {
        console.log('selection changed to ' + datasetSelection + ' with justifier: ' + justifier)
        deselectAllPoints()
        setNumThresholds(11)
        const maxUnfairness = updateThresholdCalculations()
        updateEvaluationOfD(maxUnfairness)
    }, [datasetSelection, datasetSelectionCounter]);

    useEffect(() => {
        if (datasetSelection !== '') {
            setGroup1(global.config.datasets[datasetSelection]['group1'])
            setGroup2(global.config.datasets[datasetSelection]['group2'])
            setd0description(global.config.datasets[datasetSelection]['d0']);
            setd1description(global.config.datasets[datasetSelection]['d1']);
            sety0description(global.config.datasets[datasetSelection]['y0']);
            sety1description(global.config.datasets[datasetSelection]['y1']);
        }
    }, [datasetSelection]);
    
    useEffect(() => {
        const maxUnfairness = updateThresholdCalculations()
        updateEvaluationOfD(maxUnfairness)
    }, [suTP1, suFP1, suFN1, suTN1, suTP2, suFP2, suFN2, suTN2, dmuTP, dmuFP, dmuFN, dmuTN, pattern, sufficientarianismThreshold, prioritarianismWeight, numThresholds]);

    useEffect(() => {
        updateParetoFront()
    }, [fairnessScores, decisionMakerUtility]);

    useEffect(() => {
        updateXAxisLabel()
    }, [pattern, group1, group2]);

    useEffect(() => {
        updateCorrespondsToExistingMetric()
    }, [suTP1, suFP1, suFN1, suTN1, suTP2, suFP2, suFN2, suTN2, pattern, justifier])

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
                <br/><br/>
                <b>Label the two ground truth cases:</b>
                <br/>
                <label htmlFor="y1description">Y=1</label>
                <input type="text" id="y1description" value={y1description} onChange={(e) => sety1description(e.target.value)} style={{width: "500px"}}/>
                <br/>
                <label htmlFor="y0description">Y=0</label>
                <input type="text" id="y0description" value={y0description} onChange={(e) => sety0description(e.target.value)} style={{width: "500px"}}/>
                <br/><br/>
                <b>D</b>: The decision in question; relies on Y to make this decision.
                <br/><br/>
                <b>Label the two possible decisions:</b>
                <br/>
                <label htmlFor="d1description">D=1</label>
                <input type="text" id="d1description" value={d1description} onChange={(e) => setd1description(e.target.value)} style={{width: "500px"}}/>
                <br/>
                <label htmlFor="d0description">D=0</label>
                <input type="text" id="d0description" value={d0description} onChange={(e) => setd0description(e.target.value)} style={{width: "500px"}}/>
                <br/><br/>
                
                <b>Decision maker</b>: The people or organization designing the algorithm, deciding on its design and thereby ultimately taking the decisions in question.
                <br/>
                <b>Decision subjects</b>: The people subjected to the decisions of the algorithm. They may or may not be aware that this algorithm is being deployed and used to make decisions about them.
                

                <h1>Configuration</h1>

                <h2>Decision maker's utility</h2>
                <b>How much utility does the decision maker derive from the decisions?</b>

                <h3>Currency of the decision maker</h3>
                <span>In what unit do you want to measure the utility of the decision maker?</span>
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

                <h3>Justifier</h3>
                <div>Do the socio-demographic groups have the same moral claims to utility or is it only a subgroup of them? If it is a subgroup of them, define this subgroup here:</div>

                <div onChange={(e) => setJustifier(e.target.value)}>
                    <input type="radio" value="no_justifier" name="justifier" defaultChecked="checked" /> None
                    <input type="radio" value="y_0" name="justifier" /> Y=0
                    <input type="radio" value="y_1" name="justifier" /> Y=1
                    <input type="radio" value="d_0" name="justifier" /> D=0
                    <input type="radio" value="d_1" name="justifier" /> D=1
                </div>

                <h3>Decision subjects' utility</h3>
                <div>How much utility do the decision subjects derive from the decisions?</div>

                <h4>Currency of decision subjects</h4>
                <span>In what unit do you want to measure the utility of the decision subject?</span>
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
            </div>
            <div className="ParetoPlots">
                <h1>Audit</h1>
                <h2>Pareto plot</h2>
                With the decision maker utility and a fairness metric specified, we can take a simple approach to show the trade-offs between these metrics: We go through different decision rules and calculate the metrics associated with each of them, i.e., the decision maker's utility and the fairness score. For each decision rule, we then plot the associated decision maker’s utility and fairness score in a 2D plot. We use group-specific thresholds as decision rules.
                <br/><br/>
                <b>Decision maker's utility</b>: Higher is better (total utility for the {unfilteredData['y'][0].length + unfilteredData['y'][1].length} individuals in the dataset)
                <br/>
                <b>Fairness score</b>: Higher is better
                {correspondingFairnessMetric !== undefined &&
                    <div>The fairness metric you selected corresponds to <i>{correspondingFairnessMetric}</i></div>
                }
                <br/><br/>
                {filteredData['scores'][0].length !== 0 && filteredData['scores'][1].length !== 0 &&
                    <ThresholdInput numThresholds={numThresholds} setNumThresholds={setNumThresholds}/>
                }
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
                        marker: {color: '#a61b62'}
                    },
                    {
                        x: fairnessScores,
                        y: decisionMakerUtility,
                        mode: 'markers',
                        visible: filteredData['scores'][0].length !== 0 && filteredData['scores'][1].length !== 0,
                        marker: {
                            color: colors,
                            size: 7,
                            line: {
                                color: '#000000',
                                width: 1
                            }
                        },
                        type: 'scatter',
                        hovertemplate: '<b>Decision maker\'s utility</b>: %{y:.2f}' +
                        '<br><b>Fairness score</b>: %{x:.4f}<br>' +
                        '<b>Thresholds</b>: %{text}',
                        text: thresholdTuples,
                        name: 'Decision rule'
                    },
                    {
                        x: [evaluationOfD[0]],
                        y: [evaluationOfD[1]],
                        mode: 'markers',
                        visible: evaluationOfD.length !== 0,
                        marker: {
                            color: colorOfD,
                            size: 15,
                            symbol: 'diamond',
                            line: {
                                color: '#000000',
                                width: 1
                            }
                        },
                        type: 'scatter',
                        hovertemplate: '<b>Decisions from dataset</b>' +
                        '<br><b>Decision maker\'s utility</b>: %{y:.2f}' +
                        '<br><b>Fairness score</b>: %{x:.4f}<br>',
                        name: 'Decisions from dataset'
                    },
                    ]}

                    layout={ {
                        width: 1000,
                        height: 800,
                        xaxis: { title: xAxisLabel},
                        yaxis: { title: `Decision maker's utility (in ${decisionMakerCurrency.replace('*', '')})` },
                        hovermode:'closest',
                    } }

                    onClick={(data) => {
                        var newColors = [...colors];
                        // Orange point (from D) gets index -1, every other points gets their regular index
                        let selectedPoint = -1
                        if (data.points[0].data.x.length > 1) {
                            selectedPoint = data.points[0].pointIndex
                        }
                        var indexOfSelectedPoint = selectedPoints.indexOf(selectedPoint)
                        if (indexOfSelectedPoint > -1) {
                            // deselect point and remove from list
                            selectedPoints.splice(indexOfSelectedPoint, 1)
                            delete idOfSelectedPoints[selectedPoint]
                            if (selectedPoint === -1) {
                                setColorOfD('#fff')
                            } else {
                                newColors[selectedPoint] = '#ffffff'
                            }
                        } else {
                            // select point and add to list
                            selectedPoints.push(selectedPoint)

                            if (selectedPoint === -1) {
                                idOfSelectedPoints[selectedPoint] = {
                                    id: incrementalSelectionId,
                                    decisionMakerUtility: evaluationOfD[1],
                                    fairnessScore: evaluationOfD[0]
                                }
                                setColorOfD('orange')
                            } else {
                                idOfSelectedPoints[selectedPoint] = {
                                    id: incrementalSelectionId,
                                    thresholdGroup0: thresholdTuples[selectedPoint][0],
                                    thresholdGroup1: thresholdTuples[selectedPoint][1],
                                    decisionMakerUtility: decisionMakerUtility[selectedPoint],
                                    fairnessScore: fairnessScores[selectedPoint]
                                }
                                newColors[selectedPoint] = getRandomColor()
                            }
                            
                            setIncrementalSelectionId(incrementalSelectionId + 1)
                        }
                        setColors(newColors)
                        setSelectedPoints([...selectedPoints]);
                        setIdOfSelectedPoints(idOfSelectedPoints);
                      }}
                />
            </div>
        </div>
      );
}

function UtilityQuantifier({value, setSliderValue, label, unit, disabled}) {
    var numberRegex = /[-+]?[0-9]+\.?[0-9]+/
    var unitRegex = /[^\d+]+$/;
    var multiplierRegex = /^\*\s*\d+/;
    const [currentSliderValue, setCurrentSliderValue] = useState(value)
    return (
        <div>
            <label>{label}</label>
            <br/>
            <input className="Slider" disabled={disabled} type="range" min="-10" max="10" step="0.1" value={currentSliderValue} onChange={(e) => setCurrentSliderValue(e.target.value)} onMouseUp={(e) => setSliderValue(e.target.value)} list="ticks" />
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

function ThresholdInput({numThresholds, setNumThresholds}) {
    const [currentNumThresholds, setCurrentNumThresholds] = useState(numThresholds)
    return (
        <>
        <label>Number of thresholds: How many thresholds do you want to test for each group? (min: 2, max: 101)</label>
        <input type="text" min="2" max="101" value={currentNumThresholds} onChange={(e) => setCurrentNumThresholds(e.target.value)} onBlur={(e) => {
            if (e.target.value < 2) {
                setCurrentNumThresholds(2)
            }
            if (e.target.value > 101) {
                setCurrentNumThresholds(101)
            }
            setNumThresholds(currentNumThresholds)
        }}/>
        </>
      );
}

export default ParetoPlot;