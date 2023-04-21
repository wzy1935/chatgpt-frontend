function getSavedState(state) {
  let saved = {
    settings: state.settings,
    current: null,
    live: {
      inp: '',
      id: null,
      user: null,
      assistant: null
    },
    sessions: state.sessions
  }
  return JSON.parse(JSON.stringify(saved))
}

export { getSavedState }