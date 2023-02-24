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
      .addCase(seachBcodb.fulfilled, (state, action) => {
        console.log(action.payload)
        state.results = action.payload;
        state.status = "idle";
      })
      .addCase(seachBcodb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(seachBcodb.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
      })
  }
})

export const seachBcodb = createAsyncThunk(
  "bcodb/searchBcodb",
  async (data, thunkAPI) => {
    try {
      const results = await AuthService.searchBcodbAPI(data);
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