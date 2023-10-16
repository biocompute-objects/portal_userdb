
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prefixService from "../services/prefix.service";
import { setMessage } from "./messageSlice";

export const searchPrefix = createAsyncThunk(
  "searchPrefix",
  async ({data}, thunkAPI) => {
    try {
      const response = await prefixService.searchPrefix(data);
      thunkAPI.dispatch(setMessage(`Search returned ${response.data.length} prefixes`));
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

export const registerPrefix= createAsyncThunk(
  "registerPrefix",
  async ({values}, thunkAPI) => {
    try {
      const response = await prefixService.registerPrefix(values);
      thunkAPI.dispatch(setMessage(response.data["message"]));
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

export const prefixList = createAsyncThunk(
  "prefixList",
  async (bcodb, thunkAPI) => {
    try {
      const response = await prefixService.prefixList(bcodb);
      return response.data;
    } catch(error) {
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
        state.data = action.payload
        state.status = "fulfilled";
      })
      .addCase(searchPrefix.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
      })
      .addCase(prefixList.fulfilled, (state, action) => {
        for (let i = 0; i < action.payload.length; i++) {
          if (action.payload[i].includes("draft_")) {
            const prefix = action.payload[i].split("_")[1]
            if (!(state.data.indexOf(prefix) > -1)) {
              state.data.push(prefix)
            }
          }
        }
        state.status = "fulfilled";
      })
      .addCase(prefixList.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
        state.data = ["BCO"]
      })
  }
})

export const prefixReducer = prefixSlice.reducer