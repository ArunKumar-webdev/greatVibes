import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobs,
  fetchJobById,
  addJob,
  updateExistingJob,
  deleteExistingJob,
} from "../actions/jobs";
const initialState = {
  jobs: [],
  job: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = [...state.jobs, ...action.payload];
        state.currentPage = state.currentPage + 1;
        state.hasMore = action.payload.length === 10;
      })

      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.job = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateExistingJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateExistingJob.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateExistingJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteExistingJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteExistingJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.payload.id);
      })
      .addCase(deleteExistingJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: jobsReducer } = jobsSlice;
export const { removeJob } = jobsSlice.actions;

export default jobsSlice;
