import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchGrams
} from './gramsAPI';

const initialState = {
  grams: [],
  status: 'idle',
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getGrams = createAsyncThunk(
  'grams/fetchGrams',
  async (obj) => {
    console.log("FETCHING", obj)
    const response = await fetchGrams(obj);
    // The value we return becomes the `fulfilled` action payload
    return response.data || [];
  }
);

export const gramsSlice = createSlice({
  name: 'grams',
  initialState,
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getGrams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGrams.fulfilled, (state, action) => {
        state.status = 'idle';
        state.grams = action.payload;
      })
  },

});

export const selectGrams = (state) => state.grams.grams;
export default gramsSlice.reducer;
