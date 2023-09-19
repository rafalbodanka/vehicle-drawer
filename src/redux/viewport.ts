import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

const initialState = {
  width: window.innerWidth, // Initialize with the current viewport width
};

const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
    setViewportWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
  },
});

export const { setViewportWidth } = viewportSlice.actions;
export const selectViewportWidth = (state: RootState) => state.viewport.width
export default viewportSlice.reducer;