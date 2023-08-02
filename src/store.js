import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer } from "./reducers/jobs";
import alertReducer from "./reducers/alert";
import modalSlice from "./reducers/modal";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    alert: alertReducer,
    modal: modalSlice,
  },
});
