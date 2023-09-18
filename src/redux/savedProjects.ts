import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { VehicleType } from '../utils/Types';

type SavedProjectType = {
    title: string;
    saved: boolean;
    vehicle: VehicleType;
    savedAt: Date;
}

const initialState: SavedProjectType[] = []

export const savedProjectsSlice = createSlice({
  name: 'savedProjects',
  initialState,
  reducers: {
    setSavedProjects: (state, action: PayloadAction<SavedProjectType[]>) => {
      return action.payload;
    },
  },
})

export const { setSavedProjects } = savedProjectsSlice.actions
export const selectSavedProjects = (state: RootState) => state.savedProjects
export default savedProjectsSlice.reducer