import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

/** MiddleWares */
import api from 'Middleware/ApiMiddleware'

/** Stores */
import UserStore from 'Store/UserStore'
import CommentStore from 'Store/CommentStore'
import NetworkStore from 'Store/NetworkStore'
import ScrollingStore from 'Store/ScrollingStore'

/** Store Config */
const rootReducer = combineReducers({
  CommentStore,
  NetworkStore,
  ScrollingStore,
  UserStore,
})

const persistConfig = {
  key: 'primary',
  storage: storage,
  whitelist: ['UserStore'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
  middleware: [api],
})

export type RootState = ReturnType<typeof store.getState>
export const persist = persistStore(store)
export default store
