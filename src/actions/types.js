export const SHOW_ALERT = "SHOW_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";
ß
export const showAlert = (message, type = "success") => ({
  type: SHOW_ALERT,
  payload: { message, type },
});

export const clearAlert = () => ({
  type: CLEAR_ALERT,
});
