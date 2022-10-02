import { createSlice } from '@reduxjs/toolkit'

const fairnessScoreSlice = createSlice({
    name: 'fairnessScore',
    initialState: {
        currency: 'USD',
        suTP1: 1,
        suFP1: 1,
        suFN1: 0,
        suTN1: 0,
        suTP2: 1,
        suFP2: 1,
        suFN2: 0,
        suTN2: 0,
        group1: 'group 1',
        group2: 'group 2',
        justifier: 'no_justifier',
        pattern: 'egalitarianism',
        sufficientarianismThreshold: 0.5,
        prioritarianismWeight: 2,
    },
    reducers: {
        changeSubjectsCurrency(state, action) {
            state.currency = action.payload
        },
        changeSuTP1(state, action) {
            state.suTP1 = action.payload
        },
        changeSuFP1(state, action) {
            state.suFP1 = action.payload
        },
        changeSuFN1(state, action) {
            state.suFN1 = action.payload
        },
        changeSuTN1(state, action) {
            state.suTN1 = action.payload
        },
        changeSuTP2(state, action) {
            state.suTP2 = action.payload
        },
        changeSuFP2(state, action) {
            state.suFP2 = action.payload
        },
        changeSuFN2(state, action) {
            state.suFN2 = action.payload
        },
        changeSuTN2(state, action) {
            state.suTN2 = action.payload
        },
        changeGroup1(state, action) {
            state.group1 = action.payload
        },
        changeGroup2(state, action) {
            state.group2 = action.payload
        },
        changeJustifier(state, action) {
            state.justifier = action.payload
        },
        changePattern(state, action) {
            state.pattern = action.payload
        },
        changeSufficientarianismThreshold(state, action) {
            state.sufficientarianismThreshold = action.payload
        },
        changePrioritarianismWeight(state, action) {
            state.prioritarianismWeight = action.payload
        },
    }
})

const { actions, reducer } = fairnessScoreSlice

export const { changeSubjectsCurrency, changeSuTP1, changeSuFP1, changeSuFN1, changeSuTN1, changeSuTP2, changeSuFP2, changeSuFN2, changeSuTN2, changeGroup1, changeGroup2, changeJustifier, changePattern, changeSufficientarianismThreshold, changePrioritarianismWeight } = actions

export default reducer

// selectors
export const getSubjectsCurrency = state => state.fairnessScore.currency
export const getSuTP1 = state => state.fairnessScore.suTP1
export const getSuFP1 = state => state.fairnessScore.suFP1
export const getSuFN1 = state => state.fairnessScore.suFN1
export const getSuTN1 = state => state.fairnessScore.suTN1
export const getSuTP2 = state => state.fairnessScore.suTP2
export const getSuFP2 = state => state.fairnessScore.suFP2
export const getSuFN2 = state => state.fairnessScore.suFN2
export const getSuTN2 = state => state.fairnessScore.suTN2
export const getGroup1 = state => state.fairnessScore.group1
export const getGroup2 = state => state.fairnessScore.group2
export const getJustifier = state => state.fairnessScore.justifier
export const getPattern = state => state.fairnessScore.pattern
export const getSufficientarianismThreshold = state => state.fairnessScore.sufficientarianismThreshold
export const getPrioritarianismWeight = state => state.fairnessScore.prioritarianismWeight
