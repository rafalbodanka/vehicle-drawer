import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

type ProjectType = {
    isStarterModalOpen: boolean;
    isChooseVehicleModalOpen: boolean;
    isVehicleSet: boolean;
    title: string;
    saved: boolean;
}

const initialState: ProjectType = {
    isStarterModalOpen: true,
    isChooseVehicleModalOpen: false,
    isVehicleSet: false,
    title: "",
    saved: false,
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setIsStarterModalOpen: (state, action: PayloadAction<boolean>) => {
        state.isStarterModalOpen = action.payload
    },
    setIsChooseVehicleModalOpen: (state, action: PayloadAction<boolean>) => {
        state.isChooseVehicleModalOpen = action.payload
    },
    setIsVehicleSet: (state, action: PayloadAction<boolean>) => {
        state.isVehicleSet = action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
        state.title = action.payload
    },
    setIsSaved: (state, action: PayloadAction<boolean>) => {
        state.saved = action.payload
    },
  },
})

export const { setIsStarterModalOpen, setIsChooseVehicleModalOpen, setIsVehicleSet, setTitle, setIsSaved } = projectSlice.actions
export const selectProject = (state: RootState) => state.project
export default projectSlice.reducer