import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchYu,
  fetchYuByMedia
} from '../chengyu/chengyuAPI';

const initialState = {
  duanyu: [],
  status: 'idle'
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getDuanyu = createAsyncThunk(
  'yu/fetchYu',
  async () => {
    const response = await fetchYu('duanyu');
    // The value we return becomes the `fulfilled` action payload
    return response.data || [];
  }
);

export const getDuanyuByMedia = createAsyncThunk(
  'yu/fetchYuByMedia',
  async (media) => {
    const response = await fetchYuByMedia('duanyu', media);
    // The value we return becomes the `fulfilled` action payload
    return response.data || [];
  }
);

export const duanyuSlice = createSlice({
  name: 'duanyu',
  initialState,

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getDuanyu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDuanyu.fulfilled, (state, action) => {
        state.status = 'idle';
        state.duanyu = action.payload.yu;
      })
      .addCase(getDuanyuByMedia.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDuanyuByMedia.fulfilled, (state, action) => {
        state.status = 'idle';
        state.duanyu = action.payload.yu;
      })
  },

});

export const selectDuanyu = (state) => state.duanyu.duanyu;
export const selectDuanyuByMedia = (state) => state.duanyu.duanyu;
export default duanyuSlice.reducer;
