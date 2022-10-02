import { createSlice } from '@reduxjs/toolkit'

const fairnessScoreSlice = createSlice({
    name: 'fairnessScore',
    initialState: {
        currency: 'USD',
        suTP1: 1,
        suTP2: 1
    },
    reducers: {
        changeSubjectsCurrency(state, action) {
            state.currency = action.payload
        }
    }
})

const { actions, reducer } = fairnessScoreSlice

export const { changeSubjectsCurrency } = actions

export default reducer

// selectors
export const getSubjectsCurrency = state => state.fairnessScore.currency
export const getSuTP1 = state => state.fairnessScore.suTP1
export const getSuTP2 = state => state.fairnessScore.suTP2
