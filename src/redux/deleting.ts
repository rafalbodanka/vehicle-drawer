import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

type DeletingType = {
    deletingColumn: boolean;
    deletingRow: boolean;
}

const initialState: DeletingType = {
    deletingColumn: false,
    deletingRow: false,
}

export const deletingSlice = createSlice({
  name: 'deleting',
  initialState,
  reducers: {
    toggleDeletingColumn: (state, action: PayloadAction<boolean>) => {
      const isDeletingColumnActive = action.payload
      state.deletingColumn = isDeletingColumnActive
    },
    toggleDeletingRow: (state, action: PayloadAction<boolean>) => {
      const isDeletingRowActive = action.payload
      state.deletingRow = isDeletingRowActive
    },
  },
})

export const { toggleDeletingColumn, toggleDeletingRow } = deletingSlice.actions
export const selectDeleting = (state: RootState) => state.deleting
export default deletingSlice.reducer