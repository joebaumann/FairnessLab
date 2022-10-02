import { createSlice } from '@reduxjs/toolkit'

const paretoPlotSlice = createSlice({
    name: 'terminology',
    initialState: {
        y0description: 'Y=0',
        y1description: 'Y=1',
        d0description: 'D=0',
        d1description: 'D=1',
    },
    reducers: {
        changeY0Description(state, action) {
            state.y0description = action.payload
        },
        changeY1Description(state, action) {
            state.y1description = action.payload
        },
        changeD0Description(state, action) {
            state.d0description = action.payload
        },
        changeD1Description(state, action) {
            state.d1description = action.payload
        },
    }
})

const { actions, reducer } = paretoPlotSlice

export const { changeY0Description, changeY1Description, changeD0Description, changeD1Description } = actions

export default reducer

// selectors
export const getY0Description = state => state.terminology.y0description
export const getY1Description = state => state.terminology.y1description
export const getD0Description = state => state.terminology.d0description
export const getD1Description = state => state.terminology.d1description