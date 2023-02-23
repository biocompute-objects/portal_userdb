// Define redux store

import { configureStore } from "@reduxjs/toolkit"
import { bcoReducer } from "./slices/bcoSlice"
import { accountReducer } from "./slices/accountSlice"
import { messageReducer } from "./slices/messageSlice"
import { prefixReducer } from "./slices/prefixSlice"
import { searchReducer } from "./slices/searchSlice"

export const store = configureStore({
  reducer: {
    search: searchReducer,
    prefix: prefixReducer,
    bco: bcoReducer,
    account: accountReducer,
    message: messageReducer
  }
})