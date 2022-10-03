import { createSlice } from '@reduxjs/toolkit'

const datasetSlice = createSlice({
    name: 'dataset',
    initialState: {
        datasetSelection: 'COMPAS',
        filteredData: {'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]},
        unfilteredData: {'y': [[],[]], 'scores': [[],[]], 'd': [[],[]]},
    },
    reducers: {
        changeDatasetSelection(state, action) {
            state.datasetSelection = action.payload
        },
        changeFilteredData(state, action) {
            state.filteredData = action.payload
        },
        changeUnfilteredData(state, action) {
            state.unfilteredData = action.payload
        },
    }
})

const { actions, reducer } = datasetSlice

export const { changeDatasetSelection, changeFilteredData, changeUnfilteredData } = actions

export default reducer

// selectors
export const getDatasetSelection = state => state.dataset.datasetSelection
export const getFilteredData = state => state.dataset.filteredData
export const getUnfilteredData = state => state.dataset.unfilteredData