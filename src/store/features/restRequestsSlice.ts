import { RestRequestToStore } from '@/types/RestRequestToStore';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RestState {
  value: RestRequestToStore[];
}

const initialState: RestState = {
  value: [],
};

export const restRequestsSlice = createSlice({
  name: 'restRequests',
  initialState,
  reducers: {
    addRestRequest: (state, action: PayloadAction<RestRequestToStore>) => {
      state.value.unshift(action.payload);
    },
    restoreRequests: (state, action: PayloadAction<RestRequestToStore[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addRestRequest, restoreRequests } = restRequestsSlice.actions;

export default restRequestsSlice.reducer;
