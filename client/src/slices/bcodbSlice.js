// src/slices/bcodbSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BcoService from "../services/bcodb.service";
import { setMessage } from "./messageSlice";

const bcodbSlice = createSlice({
  name: "bcodbs",
  initialState: [
    {
      data: [],
      status: "idle",
      error: null
    }
  ]
})

export const seachBcodb = createAsyncThunk(
  "searchBcodb",
  async (data, thunkAPI) => {
    try {
      const results = await BcoService.searchBcodbAPI(data);
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
