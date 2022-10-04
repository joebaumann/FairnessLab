import { configureStore } from '@reduxjs/toolkit'
import datasetReducer from './dataset'
import terminologyReducer from './terminology'
import decisionMakerReducer from './decisionMaker'
import fairnessScoreReducer from './fairnessScore'
import paretoPlotReducer from './paretoPlot'

export const store = configureStore({
    reducer: {
        dataset: datasetReducer,
        terminology: terminologyReducer,
        decisionMaker: decisionMakerReducer,
        fairnessScore: fairnessScoreReducer,
        paretoPlot: paretoPlotReducer,
    }
})