// src/slices/bcodbSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BcoService from "../services/bcodb.service";
import { setMessage } from "./messageSlice";

export const seachBcodb = createAsyncThunk(
  "searchBcodb",
  async (data, thunkAPI) => {
    try {
      const results = await BcoService.searchBcodbAPI(data);
      thunkAPI.dispatch(setMessage(results.data.message));
      return results
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

export const bcodbSlice = createSlice({
  name: "bcodbs",
  initialState: {
    data: [],
    status: "idle",
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(seachBcodb.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.data = action.payload.data;
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

export const bcodbReducer = bcodbSlice.reducer