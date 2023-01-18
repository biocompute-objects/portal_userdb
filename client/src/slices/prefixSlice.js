
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prefixService from "../services/prefix.service";
import { setMessage } from "./messageSlice";

export const searchPrefix = createAsyncThunk(
  "searchPrefix",
  async ({data}, thunkAPI) => {
    console.log(data)
    try {
      const response = await prefixService.searchPrefix(data);
      thunkAPI.dispatch(setMessage(`Search returned ${response.data.length} prefixes`));
      console.log("response",response.data)
      return response.data
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
);

export const prefixSlice = createSlice({
  name: "prefix",
  initialState: {
    data: [],
    status: "idle",
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPrefix.fulfilled, (state, action) => {
        console.log(action.payload, state)
        state.data = action.payload
      })
      .addCase(searchPrefix.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
      })
  }
})

export const prefixReducer = prefixSlice.reducer