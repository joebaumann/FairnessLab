import { createSlice } from '@reduxjs/toolkit'

const paretoPlotSlice = createSlice({
    name: 'paretoPlot',
    initialState: {
        numThresholds: 11,
        thresholdTuples: [],
        subjectsUtility: [],
        fairnessScores: [],
        decisionMakerUtility: [],
        colors: Array(121).fill('#4e87ad'),
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
        changeColors(state, action) {
            state.colors = action.payload
        },
    }
})

const { actions, reducer } = paretoPlotSlice

export const { changeNumThresholds, changeThresholdTuples, changeSubjectsUtility, changeFairnessScores, changeDecisionMakerUtility, changeColors } = actions

export default reducer

// selectors
export const getNumThresholds = state => state.paretoPlot.numThresholds
export const getThresholdTuples = state => state.paretoPlot.thresholdTuples
export const getSubjectsUtility = state => state.paretoPlot.subjectsUtility
export const getFairnessScores = state => state.paretoPlot.fairnessScores
export const getDecisionMakerUtility = state => state.paretoPlot.decisionMakerUtility
export const getColors = state => state.paretoPlot.colors