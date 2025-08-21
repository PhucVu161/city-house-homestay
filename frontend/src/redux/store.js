import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import houseSlice from "./slices/houseSlice";
import roomTypeSlice from "./slices/roomTypeSlice";
import roomSlice from "./slices/roomSlice";
import bookingSlice from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    house: houseSlice,
    roomType: roomTypeSlice,
    room: roomSlice,
    booking: bookingSlice,
  },
});