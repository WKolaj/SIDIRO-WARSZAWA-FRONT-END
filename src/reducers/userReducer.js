import { GET_USER_DATA } from "../actions/userData";

const initialState = {
  isAdmin: null,
  isUser: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
