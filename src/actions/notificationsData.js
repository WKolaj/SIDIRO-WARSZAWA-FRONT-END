import { enqueueSnackbar } from "./snackbar";

import {
  register,
  unregister,
  isRegistered
} from "../services/notifySubscribeService";

import {
  hideBusyDialogActionCreator,
  showBusyDialogActionCreator
} from "./busyDialog";

export const NOTIFICATION_GET_IS_REGISTERED = "NOTIFICATION_GET_IS_REGISTERED";

export const getIsRegisteredActionCreator = function(group) {
  return async function(dispatch, getState) {
    try {
      let registered = await isRegistered(group);

      //Also updating data according to response
      await dispatch({
        type: NOTIFICATION_GET_IS_REGISTERED,
        payload: {
          isRegistered: registered
        }
      });
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }
  };
};

export const registerActionCreator = function(group) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());

      await register(group);

      //Also updating data according to response
      await dispatch({
        type: NOTIFICATION_GET_IS_REGISTERED,
        payload: {
          isRegistered: true
        }
      });
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }

    await dispatch(hideBusyDialogActionCreator());
  };
};

export const unregisterActionCreator = function(group) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());
      await unregister(group);

      //Also updating data according to response
      await dispatch({
        type: NOTIFICATION_GET_IS_REGISTERED,
        payload: {
          isRegistered: false
        }
      });
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }
    await dispatch(hideBusyDialogActionCreator());
  };
};
