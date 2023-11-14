import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const pianoSlice = createSlice({
  name: 'piano',
  initialState,
  reducers: {
    addNote: (state, {payload:note}) => {
      if(state.value.includes(note)) return;
      state.value = [...state.value, note];
    },
    removeNote: (state, {payload:note}) => {
      state.value = state.value.filter((value) => value !== note);
    },
    deleteAllNotes: (state) => {
      state.value = [];
    }
  },
});

export const { addNote, removeNote, deleteAllNotes } = pianoSlice.actions;

export default pianoSlice.reducer;