import { createStore, combineReducers, applyMiddleware  } from "redux"
import languageReducer from "./language/languageReducer"
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer"
import thunk from 'redux-thunk'
import { actionLog } from "./middlewares/actionLog"

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))


// 反向注入从泛型获取类型
export type RootState = ReturnType<typeof store.getState>

export default store

