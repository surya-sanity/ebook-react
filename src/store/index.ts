import { allApis } from '../services/allApi';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { cartApi } from './../services/cartApi';
import { signUpApi } from './../services/signupService';
import { bookApi } from './../services/booksApi';
import tokenReducer from "./reducers/tokenReducer";
import userReducer from "./reducers/userReducer";
import storage from 'redux-persist/lib/storage'
import { walletApi } from '../services/walletApi';
import { userApi } from '../services/userService';
import { loginApi } from '../services/loginService';
import walletReducer from './reducers/walletReducer';
import cartReducer from './reducers/cartReducer';
import bookReducer from './reducers/bookReducer';
import { transactionsApi } from '../services/transactionApi';
import { combineReducers, AnyAction, Reducer } from 'redux'

const reducers = combineReducers({
  [allApis.reducerPath]: allApis.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [signUpApi.reducerPath]: signUpApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
  user: userReducer,
  token: tokenReducer,
  wallet: walletReducer,
  book: bookReducer,
  cart: cartReducer
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return reducers(state, action)
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "token"],
  transforms: [
    encryptTransform({
      secretKey: "ebookApplicationKey",
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(allApis.middleware).
      concat(userApi.middleware).
      concat(bookApi.middleware).
      concat(signUpApi.middleware).
      concat(loginApi.middleware).
      concat(cartApi.middleware).
      concat(walletApi.middleware).
      concat(transactionsApi.middleware)


    return middlewares;
  },
});

const persistor = persistStore(store);
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
