import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ClickedRestState {
  value: number | undefined;
}

const initialState: ClickedRestState = {
  value: undefined,
};

export const clickedRestSlice = createSlice({
  name: 'clickedRestId',
  initialState,
  reducers: {
    setRequest: (state, action: PayloadAction<number | undefined>) => {
      state.value = action.payload;
    },
  },
});

export const { setRequest } = clickedRestSlice.actions;

export default clickedRestSlice.reducer;
