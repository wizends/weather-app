import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    loadWeather: (state, action) => {
      state.push(action.payload)
    },
    updateWeather: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { loadWeather, updateWeather } = weatherSlice.actions

export default weatherSlice.reducer
