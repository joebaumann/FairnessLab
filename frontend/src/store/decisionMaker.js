import { createSlice } from '@reduxjs/toolkit'

const decisionMakerSlice = createSlice({
    name: 'decisionMaker',
    initialState: {
        currency: 'USD',
    },
    reducers: {
        changeDecisionMakerCurrency(state, action) {
            state.currency = action.payload
        }
    }
})

const { actions, reducer } = decisionMakerSlice

export const { changeDecisionMakerCurrency } = actions

export default reducer

// selectors
export const getDecisionMakerCurrency = state => state.decisionMaker.currency
