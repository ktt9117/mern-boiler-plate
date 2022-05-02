import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../_slices/counterSlice";
import apiReducer from "../_slices/apiSlice";
import userReducer from "../_slices/userSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    api: apiReducer,
    user: userReducer,
  },
});
