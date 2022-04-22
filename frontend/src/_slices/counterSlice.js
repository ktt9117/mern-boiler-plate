import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    message: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { increment, decrement, setMessage } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectMessage = (state) => state.counter.message;
export default counterSlice.reducer;
