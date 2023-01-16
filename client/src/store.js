// Define redux store

import { configureStore } from "@reduxjs/toolkit"
import { bcoReducer } from "./slices/bcoSlice"
import { bcodbReducer } from "./slices/bcodbSlice"
import { accountReducer } from "./slices/accountSlice"
import { messageReducer } from "./slices/messageSlice"
import { prefixReducer } from "./slices/prefixSlice"

export const store = configureStore({
  reducer: {
    prefix: prefixReducer,
    bcodb: bcodbReducer,
    bco: bcoReducer,
    account: accountReducer,
    message: messageReducer
  }
})