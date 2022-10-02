import { createSlice } from '@reduxjs/toolkit'

const paretoPlotSlice = createSlice({
    name: 'paretoPlot',
    initialState: {
        numberThresholds: 11,
    },
    reducers: {
        changeNumThresholds(state, action) {
            state.currency = action.payload
        }
    }
})

const { actions, reducer } = paretoPlotSlice

export const { changeNumThresholds } = actions

export default reducer