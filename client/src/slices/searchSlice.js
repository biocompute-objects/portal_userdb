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
        state.results = action.payload;
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

export const searchBcodbUser = createAsyncThunk(
  "searchBcodbUser",
  async ({username, public_hostname}, thunkAPI) => {
    try {
      const response = await AuthService.searchBcodbUser({username, public_hostname});
      return response.data
    } catch (error) {
      const message = `${username} not found on ${public_hostname}`
            
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const searchBcodb = createAsyncThunk(
  "bcodb/searchBcodb",
  async ({publicHostname, quickSearch}, thunkAPI) => {
    try {
      const results = await AuthService.searchBcodbAPI({publicHostname, quickSearch})
      // thunkAPI.dispatch(setMessage(`Search (${quickSearch}) returned ${results.data.length} BCOs`));
      return results.data
    } catch (error) {
      console.log(error.response)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.detail) ||
          error.message ||
          error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response);
    }
  }
)

export const advSeachBcodb = createAsyncThunk(
  "bcodb/advSeachBcodb",
  async (data, thunkAPI) => {
    try {
      const results = await AuthService.advSearchBcodbAPI(data);
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