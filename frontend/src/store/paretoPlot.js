import { createSlice } from '@reduxjs/toolkit'

const paretoPlotSlice = createSlice({
    name: 'paretoPlot',
    initialState: {
        numThresholds: 11,
        thresholdTuples: [],
        subjectsUtility: [],
        fairnessScores: [],
        decisionMakerUtility: [],
        evaluationOfD: [],
        selectedPoints: [],
        idOfSelectedPoints: {},
        incrementalSelectionId: 1,
        colorOfD: '#fff',
    },
    reducers: {
        changeNumThresholds(state, action) {
            state.numThresholds = action.payload
        },
        changeThresholdTuples(state, action) {
            state.thresholdTuples = action.payload
        },
        changeSubjectsUtility(state, action) {
            state.subjectsUtility = action.payload
        },
        changeFairnessScores(state, action) {
            state.fairnessScores = action.payload
        },
        changeDecisionMakerUtility(state, action) {
            state.decisionMakerUtility = action.payload
        },
        changeEvaluationOfD(state, action) {
            state.evaluationOfD = action.payload
        },
        changeSelectedPoints(state, action) {
            state.selectedPoints = action.payload
        },
        deleteSelectedPoint(state, action) {
            state.selectedPoints.splice(action.payload.index, 1)
            delete state.idOfSelectedPoints[action.payload.selectedPoint]
            if (action.payload.selectedPoint === -1) {
                state.colorOfD = '#fff'
            }
        },
        addSelectedPoint(state, action) {
            state.selectedPoints.push(action.payload)

            if (action.payload === -1) {
                state.colorOfD = 'orange'
            }
            state.idOfSelectedPoints[action.payload] = state.incrementalSelectionId
            state.incrementalSelectionId += 1
        },
        deselectAllPoints(state, action) {
            state.selectedPoints = []
            state.idOfSelectedPoints = {}
            state.incrementalSelectionId = 1
            state.colorOfD = '#fff'
        },
        selectEvaluationOfD(state, action) {
            state.selectedPoints = [-1]
            state.idOfSelectedPoints[-1] = 1
            state.incrementalSelectionId = 2
            state.colorOfD = 'orange'
        },
    }
})

const { actions, reducer } = paretoPlotSlice

export const { changeNumThresholds, changeThresholdTuples, changeSubjectsUtility, changeFairnessScores, changeDecisionMakerUtility, changeEvaluationOfD, changeSelectedPoints, deleteSelectedPoint, addSelectedPoint, deselectAllPoints, selectEvaluationOfD } = actions

export default reducer

// selectors
export const getNumThresholds = state => state.paretoPlot.numThresholds
export const getThresholdTuples = state => state.paretoPlot.thresholdTuples
export const getSubjectsUtility = state => state.paretoPlot.subjectsUtility
export const getFairnessScores = state => state.paretoPlot.fairnessScores
export const getDecisionMakerUtility = state => state.paretoPlot.decisionMakerUtility
export const getEvaluationOfD = state => state.paretoPlot.evaluationOfD
export const getSelectedPoints = state => state.paretoPlot.selectedPoints
export const getIdOfSelectedPoints = state => state.paretoPlot.idOfSelectedPoints
export const getColorOfD = state => state.paretoPlot.colorOfD