import { NOTIFICATION_GET_IS_REGISTERED } from "../actions/notificationsData";

const initialState = {
  isRegistered: false
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_GET_IS_REGISTERED: {
      return {
        ...state,
        isRegistered: action.payload.isRegistered
      };
    }
    default:
      return state;
  }
};
