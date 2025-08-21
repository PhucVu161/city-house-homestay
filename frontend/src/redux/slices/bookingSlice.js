import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk để tạo booking mới
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/booking",
        bookingData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Lỗi không xác định"
      );
    }
  }
);

// Thunk để lấy danh sách booking
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/booking/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Lỗi không xác định"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    currentBooking: {
      roomId: "",
      checkIn: null,
      checkOut: null,
      bookingType: "byHour",
      totalPrice: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearBookings: (state) => {
      state.bookings = [];
    },
    updateCurrentBooking: (state, action) => {
      state.currentBooking = {
        ...state.currentBooking,
        ...action.payload,
      };
    },
    resetCurrentBooking: (state) => {
      state.currentBooking = {
        roomId: "",
        checkIn: null,
        checkOut: null,
        bookingType: "byHour",
        totalPrice: 0,
      };
    },
    resetTimeCurrentBooking: (state) => {
      state.currentBooking.checkIn = null;
      state.currentBooking.checkOut = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Tạo booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Lấy danh sách booking
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookings, updateCurrentBooking, resetCurrentBooking, resetTimeCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
