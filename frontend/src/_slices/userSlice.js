import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("user/login", async (params, thunkAPI) => {
  const response = await axios.post("/api/users/login", params);
  return response.data;
});

export const registerUser = createAsyncThunk("user/register", async (params) => {
  const response = await axios.post("/api/users/register", params);
  return response.data;
});

export const logout = createAsyncThunk("/user/logout", async () => {
  const response = await axios.get("api/users/logout");
  return response.data;
});

export const authUser = createAsyncThunk("/user/auth", async () => {
  const response = await axios.get("api/users/auth");
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("apiReducer/login: ", state, action);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("loginUser.fulfilled: ", state, action);
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      console.log("authUser.fulfilled: ", state, action);
      state.user = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
