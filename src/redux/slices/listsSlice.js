import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethods";

//Get lists
export const lists = createAsyncThunk(
  "user/lists",
  async ({ type, genre }, { rejectWithValue }) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;
      const res = await userRequest.get(
        `api/lists/?type=${type}&genre=${genre}`,
        {
          headers: {
            token: "Bearer " + token,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue({ err });
    }
  }
);

//Create Slice
const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    isFetching: false,
    error: false,
    errorMessage: null,
  },
  extraReducers: {
    [lists.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [lists.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.lists = payload;
    },
    [lists.rejected]: (state, { payload }) => {
      state.error = true;
      state.errorMessage = payload;
    },
  },
});

export default listsSlice.reducer;
