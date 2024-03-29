import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cryptoReducer from '../reducers/cryptoReducer'

const reducers = {
  crypto: cryptoReducer,
}

const rootReducer = combineReducers({ ...reducers })

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default setupStore
