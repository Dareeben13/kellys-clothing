import {createStore , applyMiddleware} from 'redux'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

const middlewears = [logger]

const store = createStore( rootReducer , applyMiddleware(...middlewears))

export default store;