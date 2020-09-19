import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import createSagaMiddleWare from 'redux-saga'

import rootSaga from './root-saga'

import rootReducer from './root-reducer'

const sagaMiddleware = createSagaMiddleWare()

const middlewears = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
    middlewears.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewears))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default { store, persistor };

