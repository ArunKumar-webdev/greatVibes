import { createAsyncThunk } from "@reduxjs/toolkit";
import { getJobs, getJob, createJobs, updateJob, deleteJob } from "../api/api";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await getJobs(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await getJob(jobId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addJob = createAsyncThunk(
  "jobs/addJob",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createJobs(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingJob = createAsyncThunk(
  "jobs/updateExistingJob",
  async ({ jobData, data }, { rejectWithValue }) => {
    try {
      const response = await updateJob(jobData.id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteExistingJob = createAsyncThunk(
  "jobs/deleteExistingJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await deleteJob(jobId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
