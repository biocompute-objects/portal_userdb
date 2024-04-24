
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prefixService from "../services/prefix.service";
import { setMessage } from "./messageSlice";

export const searchPrefixRegistry = createAsyncThunk(
  "searchPrefixRegistry",
  async (data, thunkAPI) => {
    try {
      const response = await prefixService.searchPrefixRegistry(data);
      // thunkAPI.dispatch(setMessage(`Search returned ${response.data.length} prefixes`));
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
      thunkAPI.dispatch(setMessage(response.data));
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

export const getPrefixList = createAsyncThunk(
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

export const prefixInfo = createAsyncThunk(
  "prefixInfo",
  async ({public_hostname, prefixName}, thunkAPI) => {
    try {
      const response = await prefixService.prefixInfo(public_hostname, prefixName);
      return response.data;
    } catch(error) {
      console.log(error)
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

export const prefixModify = createAsyncThunk(
  "prefixModify",
  async ({returnData, public_hostname}, thunkAPI) => {
    try {
      const response = await prefixService.prefixModify(returnData, public_hostname);
      thunkAPI.dispatch(setMessage(response.data[0].message));
      return response;
    } catch(error) {
      const message =
        (error.response.data[0].message) ||
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
      .addCase(prefixInfo.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(searchPrefixRegistry.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "fulfilled";
      })
      .addCase(searchPrefixRegistry.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
      })
      .addCase(getPrefixList.fulfilled, (state, action) => {
        for (let i = 0; i < action.payload.length; i++) {
          if (action.payload[i].includes("add_")) {
            const prefix = action.payload[i].split("_")[1]
            if (!(state.data.indexOf(prefix) > -1)) {
              state.data.push(prefix)
            }
          }
        }
        state.status = "fulfilled";
      })
      .addCase(getPrefixList.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
        state.data = ["BCO"]
      })
  }
})

export const prefixReducer = prefixSlice.reducer