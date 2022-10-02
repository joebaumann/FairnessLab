import { createSlice } from '@reduxjs/toolkit'

const decisionMakerSlice = createSlice({
    name: 'decisionMaker',
    initialState: {
        currency: 'USD',
        dmuTP: 1,
        dmuFP: 0,
        dmuFN: 0,
        dmuTN: 1,
    },
    reducers: {
        changeDecisionMakerCurrency(state, action) {
            state.currency = action.payload
        },
        changeDmuTP(state, action) {
            state.dmuTP = action.payload
        },
        changeDmuFP(state, action) {
            state.dmuFP = action.payload
        },
        changeDmuFN(state, action) {
            state.dmuFN = action.payload
        },
        changeDmuTN(state, action) {
            state.dmuTN = action.payload
        },
    }
})

const { actions, reducer } = decisionMakerSlice

export const { changeDecisionMakerCurrency, changeDmuTP, changeDmuFP, changeDmuFN, changeDmuTN } = actions

export default reducer

// selectors
export const getDecisionMakerCurrency = state => state.decisionMaker.currency
export const getDmuTP = state => state.decisionMaker.dmuTP
export const getDmuFP = state => state.decisionMaker.dmuFP
export const getDmuFN = state => state.decisionMaker.dmuFN
export const getDmuTN = state => state.decisionMaker.dmuTN
