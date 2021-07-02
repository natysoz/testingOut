import { createSlice } from '@reduxjs/toolkit'

export type UserState = {
  userEmail: string | null
  isAuth: boolean
}

const initialState: UserState = {
  userEmail: null,
  isAuth: false,
}

const userSlice = createSlice({
  name: 'useStore',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userEmail = action.payload
      state.isAuth = true
    },
    removeUser: () => ({
      userEmail: null,
      isAuth: null,
    }),
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
