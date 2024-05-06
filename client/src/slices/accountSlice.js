// accountSlice

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const forgotPassword = createAsyncThunk(
  "auth/forgot_password",
  async (resetEmail, thunkAPI) => {
    try {
      console.log("Slice", resetEmail)
      const response = await AuthService.forgotPassword(resetEmail);
      
      if (response.status !== 200) {
        thunkAPI.dispatch(setMessage("Password reset not email sent"));  
      }
      thunkAPI.dispatch(setMessage("Password reset email sent"));
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

export const resetPassword = createAsyncThunk(
  "auth/forgot_password",
  async ({newPassword, token}, thunkAPI) => {
    try {
      const response = await AuthService.resetPassword({newPassword, token});
      if (response.status === 200) {
        thunkAPI.dispatch(setMessage("Your password has been reset"));
      }
      return response.data;
    } catch (error) {
      const message = JSON.stringify(error.response.data)
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
      const userResponse = await AuthService.register(username, email, password);
      const token = userResponse.data["token"]
      const apiResponse = await AuthService.registerBcoDb(email, token)
      thunkAPI.dispatch(setMessage(apiResponse.data.message));
      return apiResponse.data;
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
      const token = authentication.data["token"]
      const email = authentication.data["user"]["userinfo"]["email"]
      const apiResponse = await AuthService.registerBcoDb(email, token)
      thunkAPI.dispatch(setMessage(apiResponse.data.message));
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

export const orcidLogIn = createAsyncThunk(
  "auth/orcidLogin",
  async (code, thunkAPI) => {
    try {
      const authentication = await AuthService.orcidLogIn(code);
      // thunkAPI.dispatch(setMessage(authentication.data.message));
      console.log(authentication)
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
);

export const orcidAdd = createAsyncThunk(
  "auth/orcidAdd",
  async (code, thunkAPI) => {
    try {
      const authentication = await AuthService.orcidAdd(code);
      thunkAPI.dispatch(setMessage("ORCID added to user profile"));
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
);

export const orcidRemove = createAsyncThunk(
  "auth/orcidRemove",
  async (thunkAPI) => {
    try {
      const remove = await AuthService.orcidRemove();
      return remove
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { data };
    } catch (error) {
      const message =
        (error &&
          error.message) ||
          error.non_field_errors[0] ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout", 
  async (thunkAPI) => {
    try {
      const logout = await AuthService.logout();
      thunkAPI.dispatch(setMessage("Log out successfull"));
      return logout
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

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

export const resetToken = createAsyncThunk(
  "bcodb/resetToken",
  async ({ public_hostname, token }, thunkAPI) => {
    try {
      console.log(public_hostname, token)
      const response = await AuthService.resetToken(public_hostname, token);
      thunkAPI.dispatch(setMessage("Token reset successfull."));
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
      const response = await AuthService.permInfo(perm, token, public_hostname);
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
      .addCase(orcidLogIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(orcidLogIn.rejected, (state) => {
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
        state.user = action.payload.user;
      })
      .addCase(userInfo.rejected, (state) => {
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
      .addCase(removeBcoDb.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(groupInfo.fulfilled, (state, action) => {
        state.user.bcodbs[action.payload[1]].groups_info = action.payload[0]
      })
  },
});

export const accountReducer = accountSlice.reducer

