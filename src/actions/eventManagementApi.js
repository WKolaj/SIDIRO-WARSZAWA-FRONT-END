import axios from "axios";
import { showBusyDialogActionCreator, hideBusyDialogActionCreator } from "./busyDialog"

export const GET_EVENTS_REQUESTED = "GET_EVENTS_REQUESTED";
export const GET_EVENTS_DONE = "GET_EVENTS_DONE";
export const GET_EVENTS_FAILED = "GET_EVENTS_FAILED";

export const getEventsRequested = () => ({ type: GET_EVENTS_REQUESTED });
export const getEventsDone = (data) => ({ type: GET_EVENTS_DONE, data });
export const getEventsFailed = () => ({ type: GET_EVENTS_FAILED });

export const getEvents = () => {
  return dispatch => {
    // set state to "loading"
    dispatch(getEventsRequested());
    dispatch(showBusyDialogActionCreator())
    axios({
      url: `/api/eventmanagement/v3/events?size=100`,
      header: "application/json",
      method: "GET",
      withCredentials: true,
      xsrfCookieName: "XSRF-TOKEN",
    })
      .then(res => {
        //success
        let data = res.data._embedded.events;
        dispatch(hideBusyDialogActionCreator())
        dispatch(getEventsDone(data));
      })
      .catch(error => {
        // error
        dispatch(hideBusyDialogActionCreator())
        dispatch(getEventsFailed());
      });
  };
};
