// import { createStore, combineReducers, applyMiddleware  } from "redux"
import { createStore, applyMiddleware  } from "redux"
import languageReducer from "./language/languageReducer"
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer"
import thunk from 'redux-thunk'
import { actionLog } from "./middlewares/actionLog"
// RTK(redux-toolkit)实现
import { productDetailSlice } from './productDetail/slice'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice"
// store 持久化
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { shoppingCartSlice } from "./shoppingCart/slice"
import { orderSlice } from "./order/slice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user']  // 白名单
}

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// 普通store
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))

// RPK store
const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  devTools: true
})

const persistor = persistStore(store)

// 反向注入从泛型获取类型
export type RootState = ReturnType<typeof store.getState>

export default {store, persistor}

