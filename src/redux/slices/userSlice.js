import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../requestMethods";

//Login
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("api/auth/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue({ err });
    }
  }
);

//Register
export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("api/auth/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue({ err });
    }
  }
);

//Check Email Exists
export const email = createAsyncThunk(
  "user/checkemail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("api/auth/checkemail", data);
      return res.data;
    } catch (err) {
      return rejectWithValue({ err });
    }
  }
);

//Create Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorMessage: null,
  },
  reducers: {
    logout: (state, action) => {
      state.currentUser = null;
    },
    updateTokens: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
  },
  extraReducers: {
    [login.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.currentUser = payload;
    },
    [login.rejected]: (state, { payload }) => {
      state.error = true;
      state.errorMessage = payload;
      state.currentUser = null;
    },
    [register.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
    },
    [register.rejected]: (state, { payload }) => {
      state.error = true;
      state.errorMessage = payload;
    },
    [email.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [email.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
    },
    [email.rejected]: (state, { payload }) => {
      state.error = true;
      state.errorMessage = payload;
    },
  },
});

export const { logout, updateTokens } = userSlice.actions;

export default userSlice.reducer;
