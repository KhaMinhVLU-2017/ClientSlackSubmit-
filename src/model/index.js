export const task = {
  state: false,
  reducers: {
    // handle state changes with pure functions
    increTask (state, incre) {
      return incre
    },
    removeTask (state, {idTask}) {
      return state.tasklist.pop()
    }
  }
}
