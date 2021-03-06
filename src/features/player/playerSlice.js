import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAudio,
  sendSaveCut,
} from './playerAPI';

const initialState = {
  audioURL: '',
  record_params: {},
  status: 'idle',
  cutSaved: '',
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAudio = createAsyncThunk(
  'player/fetchAudio',
  async (obj) => {
    const response = await fetchAudio(obj);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);


export const saveCut = createAsyncThunk(
  'player/saveCut',
  async (obj) => {
    const response = await sendSaveCut(obj);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const playerSlice = createSlice({
  name: 'player',
  initialState,

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAudio.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAudio.fulfilled, (state, action) => {
        state.status = 'idle';

        const audioURL = action.payload
        const ary = audioURL.split('/')

        const matched = ary[ary.length - 1].match(/(\d+\.?\d)~(\d+\.?\d)_(.+?).mp3\?num=(\d+)$/)
        state.record_params.start = parseFloat(matched[1])
        state.record_params.stop = parseFloat(matched[2])
        state.record_params.nam = matched[3]
        state.record_params.num = matched[4]
        state.audioURL = audioURL;
      })
      .addCase(saveCut.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveCut.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cutSaved = action.payload;
      })
  },

});

export const selectAudioURL = (state) => state.player.audioURL;
export const selectRecordParams = (state) => state.player.record_params;

export default playerSlice.reducer;
