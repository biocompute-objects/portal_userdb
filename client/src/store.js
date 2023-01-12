// Define redux store

import { configureStore } from "@reduxjs/toolkit"
import { bcoReducer } from "./slices/bcoSlice"
import { bcodbReducer } from "./slices/bcodbSlice"
import { accountReducer } from "./slices/accountSlice"
import { messageReducer } from "./slices/messageSlice"

export const store = configureStore({
  reducer: {
    bcodb: bcodbReducer,
    bco: bcoReducer,
    account: accountReducer,
    message: messageReducer
  }
})