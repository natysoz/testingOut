import { createSlice } from '@reduxjs/toolkit'

export type ScrollState = {
  scroll: number
}

const initialState: ScrollState = {
  scroll: 0,
}

const scrollSlice = createSlice({
  name: 'scrollStore',
  initialState,
  reducers: {
    setScrollPosition(state) {
      state.scroll = state.scroll + 20
    },
    resetScrollPosition(state) {
      state.scroll = 0
    },
  },
})

export const { resetScrollPosition } = scrollSlice.actions

export default scrollSlice.reducer
