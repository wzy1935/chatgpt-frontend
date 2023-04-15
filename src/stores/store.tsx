import { configureStore, createSlice } from '@reduxjs/toolkit'

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    current: 0,
    sessions: [
      {
        name: 'hello',
        messages: [
          { "role": "system", "content": "You are a helpful assistant." },
          { "role": "user", "content": "Who won the world series in 2020?" },
          { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
          { "role": "user", "content": "Where was it played?" }
        ]
      }
    ]
  },
  reducers: {
    test: (state, {payload}) => {
      state.current += payload
    }
  }
})



export const { test } = mainSlice.actions
export default configureStore({
  reducer: {
    main: mainSlice.reducer
  }
})