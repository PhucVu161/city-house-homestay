import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHouses = createAsyncThunk(
  "house/fetchHouses",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");
    try {
      const response = await axios.get("http://localhost:4000/house", {
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
export const addHouse = createAsyncThunk(
  "house/addHouse",
  async (newHouseData, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      const response = await axios.post(
        "http://localhost:4000/house",
        newHouseData,
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
export const updateHouse = createAsyncThunk(
  "house/updateHouse",
  async ({ id, updatedData }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      const response = await axios.put(
        `http://localhost:4000/house/${id}`,
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
export const deleteHouse = createAsyncThunk(
  "house/deleteHouse",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      await axios.delete(`http://localhost:4000/house/${id}`, {
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

const houseSlice = createSlice({
  name: "house",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // fetch house
      .addCase(fetchHouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add house
      .addCase(addHouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHouse.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addHouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update house
      .addCase(updateHouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHouse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (house) => house._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateHouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete house
      .addCase(deleteHouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHouse.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((house) => house._id !== action.payload);
      })
      .addCase(deleteHouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default houseSlice.reducer;
