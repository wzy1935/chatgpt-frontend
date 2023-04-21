import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import chat, { initChatPromise } from '../api/chat'
import { getSavedState } from '../api/save'

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    settings: {
      model: 'gpt-3.5-turbo',
      token: import.meta.env.VITE_AI_TOKEN === undefined ? '' : import.meta.env.VITE_AI_TOKEN,
      maxLength: 512
    },
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
    loadState(state, { payload }) {
      state.settings = payload.savedState.settings
      state.current = payload.savedState.current
      state.live = payload.savedState.live
      state.sessions = payload.savedState.sessions
    },

    resetState(state) {
      const initialState = mainSlice.getInitialState()
      state.settings = initialState.settings
      state.current = initialState.current
      state.live = initialState.live
      state.sessions = initialState.sessions
    },

    saveState(state) {
      localStorage.setItem('data', JSON.stringify(getSavedState(state), undefined, 2))
    },

    saveSettings(state, { payload }) {
      state.settings = payload.settings
      mainSlice.caseReducers.saveState(state)
    },

    newSession(state, { payload }) {
      state.sessions.push({
        name: `Chat ${state.sessions.length + 1}`,
        messages: payload.messages
      })
      state.current = state.sessions.length - 1
    },

    removeSession(state, { payload }) {
      if (state.current === payload.id) {
        state.current = null
      }
      state.sessions.splice(payload.id, 1)
      mainSlice.caseReducers.saveState(state)
    },

    renameSession(state, { payload }) {
      state.sessions[payload.id].name = payload.name
      mainSlice.caseReducers.saveState(state)
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
      mainSlice.caseReducers.saveState(state)
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