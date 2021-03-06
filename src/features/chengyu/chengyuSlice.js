import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchYu,
  fetchYuByMedia
} from './chengyuAPI';

const initialState = {
  chengyu: [],
  status: 'idle'
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getChengyu = createAsyncThunk(
  'yu/fetchYu',
  async () => {
    const response = await fetchYu('chengyu');
    // The value we return becomes the `fulfilled` action payload
    return response.data || [];
  }
);

export const getChengyuByMedia = createAsyncThunk(
  'yu/fetchYuByMedia',
  async (media) => {
    const response = await fetchYuByMedia('chengyu', media);
    // The value we return becomes the `fulfilled` action payload
    return response.data || [];
  }
);

export const chengyuSlice = createSlice({
  name: 'chengyu',
  initialState,

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getChengyu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChengyu.fulfilled, (state, action) => {
        state.status = 'idle';
        state.chengyu = action.payload.yu;
      })
      .addCase(getChengyuByMedia.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChengyuByMedia.fulfilled, (state, action) => {
        state.status = 'idle';
        state.chengyu = action.payload.yu;
      })
  },

});

export const selectChengyu = (state) => state.chengyu.chengyu;
export const selectChengyuByMedia = (state) => state.chengyu.chengyu;
export default chengyuSlice.reducer;
