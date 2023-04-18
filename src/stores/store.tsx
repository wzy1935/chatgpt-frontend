import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import chat, { initChatPromise } from '../api/chat'

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    token: import.meta.env.VITE_AI_TOKEN,
    current: 0,
    live: {
      inp: '',
      session: 0,
      generating: false,
      user: null,
      assistant: null
    },
    sessions: [
      {
        name: 'hello',
        messages: [
        ]
      },
      {
        name: 'world',
        messages: [
          { "role": "system", "content": "You are a helpful assistant." },
          { "role": "user", "content": "Who won the world series in 2020?" },
          { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
          { "role": "user", "content": "Where was it played?" },
          { "role": "system", "content": "You are a helpful assistant." },
          { "role": "user", "content": "Who won the world series in 2020?" },
          { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
          { "role": "user", "content": "Where was it played?" },
          { "role": "system", "content": "You are a helpful assistant." },
          { "role": "user", "content": "Who won the world series in 2020?" },
          { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
          { "role": "user", "content": "Where was it played?" },
        ]
      }
    ]
  },
  reducers: {
    test: (state, { payload }) => {
      state.current += payload
    },

    setToken(state, { payload }) {
      if (payload.token.startsWith('sk-'))
        state.token = payload.token
    },

    newSession(state, { payload }) {
      state.sessions.push({
        name: `Chat ${state.sessions.length + 1}`,
        messages: payload.messages
      })
      state.current = state.sessions.length - 1
    },

    removeSession(state, { payload }) {
      if (state.current === id) state.current = -1
      state.sessions.splice(payload.index, 1)
    },

    setSession(state, { payload }) {
      if (state.current !== payload.id && payload.id >= 0 && payload.id < state.sessions.length) {
        state.current = payload.id
      }
    },

    setInp(state, { payload }) {
      state.live.inp = payload.inp
    },

    saveLive(state) {
      if (state.live.session === state.current && state.current !== null) {
        state.sessions[state.current].messages = state.sessions[state.current].messages.concat([
          { "role": "user", "content": state.live.user },
          { "role": "assistant", "content": state.live.assistant }
        ])
        state.live.generating = false
        state.live.user = null
        state.live.assistant = null
      }
    },

    clearLive(state, { payload }) {
      if (payload.dest >= 0 && payload.dest < state.sessions.length && payload.dest != state.current) {
        state.live = {
          inp: '',
          session: payload.dest,
          generating: false,
          user: null,
          assistant: null
        }
      }
    },

    updateAssistantLive(state, { payload }) {
      state.live.assistant = payload.content
    },

    submitUserLive(state) {
      state.live.user = state.live.inp
      state.live.inp = ''
      state.live.generating = true
    }

  },
})

let globalStore = configureStore({
  reducer: {
    main: mainSlice.reducer
  }
})


export const { ...store } = mainSlice.actions
export default globalStore