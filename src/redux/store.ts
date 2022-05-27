import { createStore, combineReducers  } from "redux"
import languageReducer from "./language/languageReducer"
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer"

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer)


// 反向注入从泛型获取类型
export type RootState = ReturnType<typeof store.getState>

export default store
