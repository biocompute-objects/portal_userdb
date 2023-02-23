// accountSlice

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const forgotPassword = createAsyncThunk(
  "auth/forgot_password",
  async (email, thunkAPI) => {
    try {
      console.log("Slice", email)
      const response = await AuthService.forgotPassword(email);
      thunkAPI.dispatch(setMessage(response.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.email[0] || error.message || 
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

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

export const userInfo = createAsyncThunk(
  "auth/userInfo",
  async (thunkAPI) => {
    try {
      const response = await AuthService.userInfo();
      return response;
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
      const response = await AuthService.account(data);
      thunkAPI.dispatch(setMessage(response.message));
      return response;
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
        error.message || JSON.stringify(error.response.data) ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
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

export const googleRegister = createAsyncThunk(
  "auth/googleRegister",
  async (data, thunkAPI) => {
    try {
      const authentication = await AuthService.googleRegister(data);
      thunkAPI.dispatch(setMessage(authentication.data.message));
      return authentication
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.non_field_errors[0] || error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  const logout = await AuthService.logout();
  thunkAPI.dispatch(setMessage("Log out successfull"));
  return logout
});

export const authenticateBcoDb = createAsyncThunk(
  "bcodb/addServer",
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

export const removeBcoDb = createAsyncThunk(
  "bcodb/removeBCODB",
  async ({database}, thunkAPI) => {
    try {
      const response = await AuthService.removeBcoDb(database);
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

export const groupInfo = createAsyncThunk(
  "bcodb/groupInfo",
  async ({group_permissions, token, public_hostname, index}, thunkAPI) => {
    try {
      const response = await AuthService.groupInfo(group_permissions, token, public_hostname);
      return [response.data, index]
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
      const response = await authService.permInfo(perm, token, public_hostname);
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
      .addCase(account.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        console.log(action.payload)
        state.user = action.payload.user;
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
        state.user.bcodbs[action.payload[1]].groups = action.payload[0]
      }) 
  },
});

export const accountReducer = accountSlice.reducer

