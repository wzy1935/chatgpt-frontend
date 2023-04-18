import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import chat, { initChatPromise } from '../api/chat'

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    token: import.meta.env.VITE_AI_TOKEN,
    current: null,
    live: {
      inp: '',
      id: null, // chat id equals to this only if session never changed
      user: null,
      assistant: null
    },
    sessions: [
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
        mainSlice.caseReducers.clearLive(state)
      }
    },

    setInp(state, { payload }) {
      state.live.inp = payload.inp
    },

    // finish (terminate chat)
    saveLive(state, { payload }) {
      if (state.live.id === payload.id) {
        if (!payload.discard) {
          state.sessions[state.current].messages = state.sessions[state.current].messages.concat([
            { "role": "user", "content": state.live.user },
            { "role": "assistant", "content": state.live.assistant }
          ])
        }
        state.live.id = null
        state.live.user = null
        state.live.assistant = null
      }
    },

    // terminate chat
    clearLive(state) {
      state.live = {
        inp: '',
        id: null,
        user: null,
        assistant: null
      }
    },

    // running chat
    updateAssistantLive(state, { payload }) {
      if (payload.id === state.live.id) {
        state.live.assistant = payload.content
      }
    },

    // start chat
    submitUserLive(state, { payload }) {
      state.live.id = payload.id
      state.live.user = state.live.inp
      state.live.inp = ''
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