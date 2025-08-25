import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

// Thunk lấy thông tin phòng đang book
export const fetchRoomById = createAsyncThunk(
  "room/fetchRoomById",
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/room/${roomId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi không xác định"
      );
    }
  }
);

// Thunk để tạo booking mới
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token");
    try {
      const response = await axios.post(
        "http://localhost:4000/booking",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.booking;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Lỗi không xác định"
      );
    }
  }
);

// Thunk để lấy danh sách booking của người dùng
export const fetchMyBookings = createAsyncThunk(
  "booking/fetchMyBookings",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token");
    try {
      const response = await axios.get("http://localhost:4000/booking/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.bookings;
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
    list: [],
    currentBooking: sessionStorage.getItem("currentBooking")
      ? JSON.parse(sessionStorage.getItem("currentBooking"))
      : {
          roomId: "",
          checkIn: null,
          checkOut: null,
          bookingType: "byHour",
          totalPrice: 0,
        },
    currentRoom: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBookings: (state) => {
      state.list = [];
    },
    updateCurrentBooking: (state, action) => {
      state.currentBooking = {
        ...state.currentBooking,
        ...action.payload,
      };
      sessionStorage.setItem(
        "currentBooking",
        JSON.stringify(state.currentBooking)
      );
      //Lấy thông tin phòng, checkin, checkout và loại booking để tính totalPrice
      const { roomId, checkIn, checkOut, bookingType } = state.currentBooking;
      //thông tin phòng chứa giá lưu trong roomSlice nên chú ý phải fetchRoomById để có thông tin phòng trước rồi updateCurrentBooking
      const room = state.currentRoom;
      //Kiểm tra nếu đủ thông tin thì tính giá
      let totalPrice = 0;
      if (room && room._id === roomId && checkIn && checkOut && bookingType) {
        let prices = room.roomType.prices;
        const start = dayjs(checkIn);
        const end = dayjs(checkOut);
        switch (bookingType) {
          case "byHour":
            totalPrice = end.diff(start, "hour") * prices.hour;
            break;
          case "halfDay":
            const dayOfWeek = start.day(); //kiểm tra ngày checkin có phải t6 t7 cn không
            if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
              totalPrice = prices.weekend.halfDay;
            } else {
              totalPrice = prices.weekday.halfDay;
            }
            break;
          case "byDay":
            let weekendCount = 0;
            let weekdayCount = 0;

            let current = start;
            while (current.isBefore(end, "day")) {
              const day = current.day(); // 0 = Chủ Nhật, 5 = Thứ Sáu, 6 = Thứ Bảy
              if (day === 5 || day === 6 || day === 0) {
                weekendCount++;
              } else {
                weekdayCount++;
              }
              current = current.add(1, "day");
            }
            totalPrice =
              weekdayCount * prices.weekday.allDay +
              weekendCount * prices.weekend.allDay;
            break;
          default:
            break;
        }
      } else {
        console.log("lỗi");
      }
      state.currentBooking.totalPrice = totalPrice;
    },
    resetCurrentBooking: (state) => {
      state.currentBooking = {
        roomId: "",
        checkIn: null,
        checkOut: null,
        bookingType: "byHour",
        totalPrice: 0,
      };
      sessionStorage.removeItem("currentBooking");
    },
    resetTimeCurrentBooking: (state) => {
      state.currentBooking.checkIn = null;
      state.currentBooking.checkOut = null;
      sessionStorage.setItem(
        "currentBooking",
        JSON.stringify(state.currentBooking)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch room by id
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRoom = action.payload;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Tạo booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Lấy danh sách booking
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearBookings,
  updateCurrentBooking,
  resetCurrentBooking,
  resetTimeCurrentBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
