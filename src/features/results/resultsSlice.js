import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchResults
} from './resultsAPI';

const initialState = {
  results: [],
  status: 'idle',
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getResults = createAsyncThunk(
  'results/fetchResults',
  async (query) => {
    const response = await fetchResults(query);
    // The value we return becomes the `fulfilled` action payload
    return response.data.children || [];
  }
);

export const resultsSlice = createSlice({
  name: 'results',
  initialState,

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getResults.fulfilled, (state, action) => {
        state.status = 'idle';
        state.results = action.payload;
      })
  },

});

export const selectResults = (state) => state.results.results;

export default resultsSlice.reducer;
