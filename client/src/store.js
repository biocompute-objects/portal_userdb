// Define redux store

import { configureStore } from "@reduxjs/toolkit"
import { bcoReducer } from "./slices/bcoSlice"
import { accountReducer } from "./slices/accountSlice"
import { messageReducer } from "./slices/messageSlice"

export const store = configureStore({
  reducer: {
    bco: bcoReducer,
    account: accountReducer,
    message: messageReducer
  }
})