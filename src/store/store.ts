import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { authSlice } from '@estia/store/slices/auth';
import { apiHandler } from '@estia/networking/api-handler'; // important this is imported after slices
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { generalSlice } from '@estia/store/slices/general';
import storage from '@estia/store/storage';
import { tempSlice } from '@estia/store/slices/temporary';
import { stompMiddleware } from '@estia/networking/stomp-middleware';

const persistConfig = {
  key: 'estia-store',
  version: 1,
  storage: storage,
  blacklist: [apiHandler.reducerPath, tempSlice.reducerPath],
};

const reducers = combineReducers({
  [apiHandler.reducerPath]: apiHandler.reducer,
  [authSlice.name]: authSlice.reducer,
  [generalSlice.name]: generalSlice.reducer,
  [tempSlice.name]: tempSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          serializableCheck: false,
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiHandler.middleware, stompMiddleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
