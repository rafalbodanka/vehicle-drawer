import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
    setViewport: (state, action: PayloadAction<{width: number; height: number}>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export const { setViewport } = viewportSlice.actions;
export const selectViewport = (state: RootState) => state.viewport
export default viewportSlice.reducer;