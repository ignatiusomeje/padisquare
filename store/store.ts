import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ShopAPI } from "./ShopAPI";
import ShopSlice from "@/features/shop/data/shopSlice";

const persistConfig = {
  key: "Padisquare",
  storage,
  autoMergeLevel2,
  blacklist: [
    ShopAPI.reducerPath,
    "Shop",
    // // "sideBarChat",
  ],
};

const rootReducer = combineReducers({
  Shop: ShopSlice,
  [ShopAPI.reducerPath]: ShopAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(ShopAPI.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
