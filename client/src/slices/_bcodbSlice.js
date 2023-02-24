// src/slices/bcodbSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bcodbService from "../services/bcodb.service";
import { setMessage } from "./messageSlice";

export const authenticateBcoDb = createAsyncThunk(
  "bcodb/addServer",
  async ({ token, hostname }, thunkAPI) => {
    console.log(token, hostname);
    try {
      const bcodbResponse = await bcodbService.authenticateBcoDb(token, hostname);
      const userDbResponse = await bcodbService.addBcoDb(bcodbResponse)
      console.log(userDbResponse)
      thunkAPI.dispatch(setMessage(userDbResponse.data.message));
      return userDbResponse.data ;
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

export const removeBcoDb = createAsyncThunk(
  "bcodb/removeBCODB",
  async ({database}, thunkAPI) => {
    try {
      const response = await bcodbService.removeBcoDb(database);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
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

export const seachBcodb = createAsyncThunk(
  "bcodb/searchBcodb",
  async (data, thunkAPI) => {
    try {
      const results = await bcodbService.searchBcodbAPI(data);
      thunkAPI.dispatch(setMessage(`Search returned ${results.data.length} BCOs`));
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

export const groupInfo = createAsyncThunk(
  "bcodb/groupInfo",
  async ({group, token, public_hostname}, thunkAPI) => {
    try {
      const response = await bcodbService.groupInfo(group, token, public_hostname);
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
)

export const permInfo = createAsyncThunk(
  "bcodb/permInfo",
  async ({perm, token, public_hostname}, thunkAPI) => {
    try {
      const response = await bcodbService.permInfo(perm, token, public_hostname);
      return response
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
    groups: [],
    permissions: [],
    status: "idle",
    error: null
  },
  reducers: {
    groupsPermissions: (state, action) => {
      console.log(state.data, action.payload)
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(seachBcodb.fulfilled, (state, action) => {
        console.log(action.payload)
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(seachBcodb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(seachBcodb.rejected, (state, action) => {
        state.error = action.error.message
        state.status = "failed";
      })
      .addCase(authenticateBcoDb.pending, () => {
        console.log("loading")
      })
      .addCase(authenticateBcoDb.fulfilled, (state, action) => {
        state.user.bcodbs.push(action.payload.data.data)
      })
      .addCase(authenticateBcoDb.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(removeBcoDb.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(groupInfo.fulfilled, (state, action) => {
        console.log(action.payload)
        state.groups = action.payload
      }) 
  }
})

export const bcodbReducer = bcodbSlice.reducer
export const {
  groupsPermissions,
} = bcodbSlice.actions;