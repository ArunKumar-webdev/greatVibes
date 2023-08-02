import { createSlice } from "@reduxjs/toolkit";

const alertReducer = createSlice({
  name: "alert",
  initialState: null,
  reducers: {
    showAlert(state, action) {
      return { type: action.payload.type, message: action.payload.message };
    },
    clearAlert(state) {
      return null;
    },
  },
});

export const showAlert = (message, type) => (dispatch) => {
  dispatch(alertReducer.actions.showAlert({ message, type }));
  setTimeout(() => {
    dispatch(alertReducer.actions.clearAlert());
  }, 2000);
};

export default alertReducer.reducer;
