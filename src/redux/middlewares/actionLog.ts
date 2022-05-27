
// redux中间件公式 const middleware = (store) => (next) => (action) => {} (柯里化概念)
// 调用 middleware(store)(next)(action)

import { Middleware } from "redux"

export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log('state 当前', store.getState())
  console.log(' fire state', action)
  next(action)
  console.log('state 更新', store.getState())
}