import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
    updateUser: (state, action) => {
      state.value = {...state.value, ...action.payload}
    }
  },
})

export const { setUser, updateUser } = userSlice.actions

export default userSlice.reducer