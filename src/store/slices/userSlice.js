import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if(action.payload === null) {
        state.value = null;
        return;
      }

      const user = action.payload;
      
      if(typeof action.payload.date === 'object') {
        user.date = user.date.toDate().toString();
      }

      state.value = action.payload;
    },
    updateUser: (state, action) => {
      const data = action.payload;

      if(typeof action.payload.date === 'object') {
        data.date = data.date.toString();
      }

      state.value = {...state.value, ...data};
    }
  },
});

export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;