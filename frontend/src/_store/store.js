import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../_slices/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
