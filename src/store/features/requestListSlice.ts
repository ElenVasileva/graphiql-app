import { RestRequestToStore } from '@/types/RestRequestToStore';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RequestListState {
  value: RestRequestToStore[];
}

const initialState: RequestListState = {
  value: [],
};

export const requestListSlice = createSlice({
  name: 'requestList',
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<RestRequestToStore>) => {
      state.value.unshift(action.payload);
    },
  },
});

export const { addRequest } = requestListSlice.actions;

export default requestListSlice.reducer;
