import { createSlice } from '@reduxjs/toolkit'
import { set } from 'lodash/fp'

export type NetworkState = {
  readonly [key: string]: number
}

const initialState: NetworkState = {}

const networkSlice = createSlice({
  name: 'networkStore',
  initialState,
  reducers: {
    startNetwork(state, action: { payload: string }) {
      return set(
        action.payload,
        state[action.payload] ? state[action.payload] + 1 : 1,
        state
      )
    },
    endNetwork(state, action: { payload: string }) {
      return set(
        action.payload,
        state[action.payload] ? state[action.payload] - 1 : 0,
        state
      )
    },
  },
})

export const { startNetwork, endNetwork } = networkSlice.actions

export default networkSlice.reducer
