import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../redux/slices/bookingSlice";
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer
  },
});
