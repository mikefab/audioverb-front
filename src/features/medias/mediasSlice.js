import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchMedias
} from './mediasAPI';

const initialState = {
  medias: [],
  media: '',
  status: 'idle',
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getMedias = createAsyncThunk(
  'medias/fetchMedias',
  async (language) => {
    const response = await fetchMedias(language);
    // The value we return becomes the `fulfilled` action payload
    return response.data || [];
  }
);

export const mediasSlice = createSlice({
  name: 'medias',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMedia: (state, action) => {
      state.media = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getMedias.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMedias.fulfilled, (state, action) => {
        state.status = 'idle';
        state.medias = action.payload;
      })
  },

});

export const selectMedias = (state) => state.medias.medias;
export const selectMedia = (state) => state.medias.media;
export const { setMedia } = mediasSlice.actions;
export default mediasSlice.reducer;
