import { createSlice } from '@reduxjs/toolkit';

export const placeSlice = createSlice({
  name: 'searchedPlace',
  initialState: {
    searchPlace: '',
    choicePlace: {},
  },
  reducers: {
    searchPlace: (state, actions) => {
      state.searchedPlace = actions.payload;
    },
    choicePlace: (state, actions) => {
      state.choicePlace = actions.payload;
    },
  },
});

export const { searchPlace, choicePlace } = placeSlice.actions;

export default placeSlice.reducer;
