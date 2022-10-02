import { createSlice } from '@reduxjs/toolkit'

const datasetSlice = createSlice({
    name: 'dataset',
    initialState: {
        datasetSelection: 'COMPAS',
    },
    reducers: {
        changeDatasetSelection(state, action) {
            state.datasetSelection = action.payload
        }
    }
})

const { actions, reducer } = datasetSlice

export const { changeDatasetSelection } = actions

export default reducer

// selectors
export const getDatasetSelection = state => state.dataset.datasetSelection
