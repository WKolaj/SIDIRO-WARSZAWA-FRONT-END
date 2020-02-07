import { getCurrentUser } from "../services/userService";

import { enqueueSnackbar } from "./snackbar";

export const GET_USER_DATA = "GET_USER_DATA";

export const getUserDataActionCreator = function() {
  return async function(dispatch, getState) {
    try {
      let user = await getCurrentUser();

      //Also updating data according to response
      await dispatch({
        type: GET_USER_DATA,
        payload: user
      });
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }
  };
};
