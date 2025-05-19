import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPostings = createAsyncThunk("/posting/getPosting", async () => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/jobs/postings`
    );
    return result.data;
  } catch (err) {
    return err;
  }
});

const postingSlice = createSlice({
  name: "posting",
  initialState: {
    postings: [],
    isLoading: false,
    isError: false,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostings.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPostings.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getPostings.fulfilled, (state, action) => {
        state.postings = action.payload;
        state.isLoading = false;
      });
  },
});

export default postingSlice.reducer;
