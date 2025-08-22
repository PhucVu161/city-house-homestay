import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//thunk cho người sử dụng
export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/room");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const searchRooms = createAsyncThunk(
  "room/searchRooms",
  async ({ checkIn, checkOut }, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/room/search", {
        params: {
          checkIn,
          checkOut,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Search failed"
      );
    }
  }
);
export const fetchRoomById = createAsyncThunk(
  "room/fetchRoomById",
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/room/${roomId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Lỗi không xác định");
    }
  }
);

//thunk cho admin quản lý
export const addRoom = createAsyncThunk(
  "room/addRoom",
  async (newRoomData, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      const response = await axios.post(
        "http://localhost:4000/room",
        newRoomData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Add failed"
      );
    }
  }
);
export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async ({ id, updatedData }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      const response = await axios.put(
        `http://localhost:4000/room/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);
export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      await axios.delete(`http://localhost:4000/room/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Trả về id để reducer có thể xóa khỏi state
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState: {
    list: [],
    currentRoom: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
// fetch rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
// search rooms
      .addCase(searchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // Ghi đè danh sách phòng bằng kết quả tìm kiếm
      })
      .addCase(searchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
// Add room
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
// Update room
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (room) => room._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
// Delete room
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((room) => room._id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomSlice.reducer;
