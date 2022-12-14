import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import pf from 'pareto-frontier';
import Plot from 'react-plotly.js';
import './ParetoPlot.css';
import '../../config';

import { getDatasetSelection, getFilteredData, getUnfilteredData } from '../../store/dataset';
import { getDecisionMakerCurrency, getDmuFN, getDmuFP, getDmuTN, getDmuTP } from '../../store/decisionMaker';
import { getSubjectsCurrency, getSuTP1, getSuFP1, getSuFN1, getSuTN1, getSuTP2, getSuFP2, getSuFN2, getSuTN2, getGroup1, getGroup2, getPattern, getSufficientarianismThreshold, getPrioritarianismWeight, getFairnessScoreDescription } from '../../store/fairnessScore';
import { addSelectedPoint, changeDecisionMakerUtility, changeEvaluationOfD, changeFairnessScores, changeNumThresholds, changeSubjectsUtility, changeThresholdTuples, deleteSelectedPoint, deselectAllPoints, getColorOfD, getDecisionMakerUtility, getEvaluationOfD, getFairnessScores, getNumThresholds, getSelectedPoints, getThresholdTuples, selectEvaluationOfD } from '../../store/paretoPlot';

function ParetoPlot({colors, setColors}) {
    
    const dispatch = useDispatch ()
    function setNumThresholds(value) {dispatch(changeNumThresholds(value))}
    function setThresholdTuples(value) {dispatch(changeThresholdTuples(value))}
    function setSubjectsUtility(value) {dispatch(changeSubjectsUtility(value))}
    function setFairnessScores(value) {dispatch(changeFairnessScores(value))}
    function setDecisionMakerUtility(value) {dispatch(changeDecisionMakerUtility(value))}
    function setEvaluationOfD(value) {dispatch(changeEvaluationOfD(value))}

    const datasetSelection = useSelector(getDatasetSelection)
    const decisionMakerCurrency = useSelector(getDecisionMakerCurrency)
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
    const pattern = useSelector(getPattern);
    const numThresholds = useSelector(getNumThresholds);
    const sufficientarianismThreshold = useSelector(getSufficientarianismThreshold);
    const prioritarianismWeight = useSelector(getPrioritarianismWeight);
    const filteredData = useSelector(getFilteredData);
    const unfilteredData = useSelector(getUnfilteredData);
    const fairnessScoreDescription = useSelector(getFairnessScoreDescription)
    
    const fairnessScores = useSelector(getFairnessScores);
    const decisionMakerUtility = useSelector(getDecisionMakerUtility);
    const thresholdTuples = useSelector(getThresholdTuples);
    const evaluationOfD = useSelector(getEvaluationOfD);
    const selectedPoints = useSelector(getSelectedPoints);
    const colorOfD = useSelector(getColorOfD)

    const [paretoOptimalPointsX, setParetoOptimalPointsX] = useState([]);
    const [paretoOptimalPointsY, setParetoOptimalPointsY] = useState([]);
    const [xAxisLabel, setXAxisLabel] = useState(null);

    function getRandomColor() {
        // get a random color while avoiding yellow and colors that are too light
        let hue = ~~(360 * Math.random())
        while (hue >= 51 && hue <= 60) {
            hue = ~~(360 * Math.random())
        }
        return `hsla(${hue},80%,50%,0.8)`
    }

    function deselectAllPointsAndD() {
        dispatch(deselectAllPoints())
        setColors(Array(numThresholds * numThresholds).fill('#ffffff'))
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
            if (pattern === "egalitarianism") {
                fairnessScores = fairnessScores.map(function(s, i) {
                    return -s;
                });
            }
            setFairnessScores(fairnessScores)
            setSubjectsUtility(combineThresholds(numThresholds, filteredData['scores'][0], filteredData['scores'][1], filteredData['y'][0], filteredData['y'][1], averageUtility, tuple, [suTP1, suFP1, suFN1, suTN1], [suTP2, suFP2, suFN2, suTN2]))
        }
    }

    function updateEvaluationOfD() {
        let evaluationOfD = []
        if (filteredData['d'][0].length !== 0 || filteredData['d'][1].length !== 0) {
            let decisionMakerUtility_A = calculateUtilityFromDecisions(unfilteredData['d'][0], unfilteredData['y'][0], [dmuTP, dmuFP, dmuFN, dmuTN])
            let decisionMakerUtility_B = calculateUtilityFromDecisions(unfilteredData['d'][1], unfilteredData['y'][1], [dmuTP, dmuFP, dmuFN, dmuTN])
            let decisionMakerUtility = sum(decisionMakerUtility_A, decisionMakerUtility_B)
            let fairnessValue_A = calculateUtilityFromDecisions(filteredData['d'][0], filteredData['y'][0], [suTP1, suFP1, suFN1, suTN1]) / filteredData['d'][0].length
            let fairnessValue_B = calculateUtilityFromDecisions(filteredData['d'][1], filteredData['y'][1], [suTP2, suFP2, suFN2, suTN2]) / filteredData['d'][1].length
            let combineFunction = patternMapper(pattern)
            let fairnessScore = combineFunction(fairnessValue_A, fairnessValue_B)
            if (pattern === "egalitarianism") {
                fairnessScore = -fairnessScore
            }
            evaluationOfD = [fairnessScore, decisionMakerUtility, [fairnessValue_A, fairnessValue_B]]
        }
        setEvaluationOfD(evaluationOfD)
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
        deselectAllPointsAndD()
        setNumThresholds(11)
        updateThresholdCalculations()
        updateEvaluationOfD()
        if (filteredData['d'][0].length !== 0 || filteredData['d'][1].length !== 0) {
            dispatch(selectEvaluationOfD())
        }
    }, [datasetSelection, filteredData, unfilteredData]);

    useEffect(() => {
        updateThresholdCalculations()
        updateEvaluationOfD()
    }, [suTP1, suFP1, suFN1, suTN1, suTP2, suFP2, suFN2, suTN2, dmuTP, dmuFP, dmuFN, dmuTN, pattern, sufficientarianismThreshold, prioritarianismWeight, numThresholds]);

    useEffect(() => {
        updateParetoFront()
    }, [fairnessScores, decisionMakerUtility]);

    useEffect(() => {
        deselectAllPointsAndD()
    }, [numThresholds]);

    useEffect(() => {
        updateParetoFront()
    }, []);

    return (
        <div className='ParetoPlot'>
            <h2>Pareto plot</h2>
            With the decision maker utility and a fairness metric specified, we can take a simple approach to show the trade-offs between these metrics: We go through different decision rules and calculate the metrics associated with each of them, i.e., the decision maker's utility and the fairness score. For each decision rule, we then plot the associated decision maker???s utility and fairness score in a 2D plot. We use group-specific thresholds as decision rules. Select threshold rules that you want to compare by clicking on the points in the plot.
            <br/><br/>
            <b>Decision maker's utility</b>: Higher is better (total utility for the {unfilteredData['y'][0].length + unfilteredData['y'][1].length} individuals in the dataset)
            <br/>
            <b>Fairness score</b>: Higher is better

            
            <br/><br/>
            {filteredData['scores'][0].length !== 0 && filteredData['scores'][1].length !== 0 &&
                <ThresholdInput numThresholds={numThresholds} setNumThresholds={setNumThresholds}/>
            }
            <br/><br/>
            <div>
                <button onClick={deselectAllPointsAndD}>
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
                    `<b>Thresholds</b>: ${group1}: %{text[0]}, ${group2}: %{text[1]}`,
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
                    hovertemplate: '<b>Decisions from dataset (column D)</b>' +
                    '<br><b>Decision maker\'s utility</b>: %{y:.2f}' +
                    '<br><b>Fairness score</b>: %{x:.4f}<br>',
                    name: 'Decisions from dataset (column D)'
                },
                ]}

                layout={ {
                    width: 1000,
                    height: 800,
                    xaxis: { title: `Fairness score<br>${fairnessScoreDescription}`},
                    yaxis: { title: `Decision maker's utility (in ${decisionMakerCurrency.replace('*', '')})` },
                    hovermode:'closest',
                    responsive: true
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
                        dispatch(deleteSelectedPoint({'index': indexOfSelectedPoint, 'selectedPoint': selectedPoint}))
                        if (selectedPoint !== -1) {
                            newColors[selectedPoint] = '#fff'
                        }
                    } else {
                        // select point and add to list
                        dispatch(addSelectedPoint(selectedPoint))
                        if (selectedPoint !== -1) {
                            newColors[selectedPoint] = getRandomColor()
                        }
                    }
                    setColors(newColors)
                }}
            />
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