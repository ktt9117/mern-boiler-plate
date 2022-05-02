import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessage = createAsyncThunk("api/fetchMessage", async (params, thunkAPI) => {
  console.log("fetchMessage called params: ", params, thunkAPI);
  const response = await axios.get("api/hello", { params });
  return response.data;
});

export const apiSlice = createSlice({
  name: "api",
  initialState: {
    message: null,
  },
  reducers: {
    setMessage: (state, action) => {
      console.log("apiReducer/setMessage: ", state, action);
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessage.fulfilled, (state, action) => {
      console.log("fetchMessage.fulfilled: ", state, action);
      state.message = action.payload.message;
    });
  },
});

export const { setMessage } = apiSlice.actions;
export const selectMessage = (state) => state.api.message;
export default apiSlice.reducer;
