import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import houseSlice from "./slices/houseSlice";
import roomTypeSlice from "./slices/roomTypeSlice";
import roomSlice from "./slices/roomSlice";
import bookingSlice from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    house: houseSlice,
    roomType: roomTypeSlice,
    room: roomSlice,
    booking: bookingSlice,
  },
});