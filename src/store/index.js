// Init store inteads of createStore in redux
import { init } from '@rematch/core'
// Input models in store
import * as models from '../model'

const store = init({
  models
})

export default store
