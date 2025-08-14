import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoomTypes = createAsyncThunk(
  "roomType/fetchRoomTypes",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");
    try {
      const response = await axios.get("http://localhost:4000/room-type", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const addRoomType = createAsyncThunk(
  "roomType/addRoomType",
  async (newRoomTypeData, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      const response = await axios.post(
        "http://localhost:4000/room-type",
        newRoomTypeData,
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
export const updateRoomType = createAsyncThunk(
  "roomType/updateRoomType",
  async ({ id, updatedData }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      const response = await axios.put(
        `http://localhost:4000/room-type/${id}`,
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
export const deleteRoomType = createAsyncThunk(
  "roomType/deleteRoomType",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      await axios.delete(`http://localhost:4000/room-type/${id}`, {
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

const roomTypeSlice = createSlice({
  name: "roomType",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // fetch roomType
      .addCase(fetchRoomTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRoomTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add roomType
      .addCase(addRoomType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoomType.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addRoomType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update roomType
      .addCase(updateRoomType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoomType.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (roomType) => roomType._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateRoomType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete roomType
      .addCase(deleteRoomType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoomType.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((roomType) => roomType._id !== action.payload);
      })
      .addCase(deleteRoomType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomTypeSlice.reducer;