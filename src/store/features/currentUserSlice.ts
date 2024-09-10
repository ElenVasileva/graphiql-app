import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  value: string | undefined;
}

const initialState: UserState = {
  value: undefined,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
