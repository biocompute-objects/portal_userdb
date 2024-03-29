// src/slices/searchSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import AuthService from "../services/auth.service";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    searches: [],
    status: "idle",
    error: null
  },
  reducers: {
    setSearch: (state, action) => {
      state.searches = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(advSeachBcodb.fulfilled, (state, action) => {
        console.log(action.payload)
        state.results = action.payload;
        state.status = "fulfilled";
      })
      .addCase(advSeachBcodb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(advSeachBcodb.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
      })
      .addCase(searchBcodb.fulfilled, (state, action) => {
        console.log(action.payload[0])
        state.results = action.payload[0];
        state.status = "fulfilled";
      })
      .addCase(searchBcodb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchBcodb.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
      })
  }
})

export const searchBcodb = createAsyncThunk(
  "bcodb/searchBcodb",
  async ({publicHostname, quickSearch}, thunkAPI) => {
    try {
      console.log("slice", publicHostname, quickSearch)
      const results = await AuthService.searchBcodbAPI({publicHostname, quickSearch})
      thunkAPI.dispatch(setMessage(`Search (${quickSearch}) returned ${results.data[0].length} BCOs`));
      return results.data
    } catch (error) {
      const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const advSeachBcodb = createAsyncThunk(
  "bcodb/advSeachBcodb",
  async (data, thunkAPI) => {
    try {
      const results = await AuthService.advSearchBcodbAPI(data);
      thunkAPI.dispatch(setMessage(`Search returned ${results.data.length} BCOs`));
      thunkAPI.dispatch(setSearch(data));
      return results.data
    } catch (error) {
      const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const searchReducer = searchSlice.reducer
export const {
  setSearch
} = searchSlice.actions;