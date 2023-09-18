import { configureStore } from '@reduxjs/toolkit'
import vehicleReducer from "./vehicle"
import deletingReducer from "./deleting"
import projectReducer from "./project"
import savedProjectsReducer from './savedProjects'

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
    deleting: deletingReducer,
    project: projectReducer,
    savedProjects: savedProjectsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch