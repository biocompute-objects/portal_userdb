// accountSlice

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";

import AuthService from "../services/auth.service";
const user = JSON.parse(localStorage.getItem("user"));

export const changePassword = createAsyncThunk(
  "auth/change_password",
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.changePassword(data);
      thunkAPI.dispatch(setMessage(response.message));
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

export const account = createAsyncThunk(
  "auth/account",
  async (data, thunkAPI) => {
    try {
      console.log("accountSlice")
      const response = await AuthService.account(data);
      thunkAPI.dispatch(setMessage(response.message));
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

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
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

export const googleLogin = createAsyncThunk(
  "auth/google",
  async (idToken, thunkAPI) => {
    try {
      const authentication = await AuthService.googleLogin(idToken);
      // thunkAPI.dispatch(setMessage(authentication.data.message));
      return authentication
    } catch (error) {
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      // thunkAPI.dispatch(setMessage(data.data.message));
      return { data };
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const authenticateBcoDb = createAsyncThunk(
  "addServer",
  async ({ token, hostname }, thunkAPI) => {
    console.log(token, hostname);
    try {
      const bcodbResponse = await AuthService.authenticateBcoDb(token, hostname);
      const userDbResponse = await AuthService.addBcoDb(bcodbResponse)
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

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const accountSlice = createSlice({
  name: "account",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
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
  },
});

export const accountReducer = accountSlice.reducer
