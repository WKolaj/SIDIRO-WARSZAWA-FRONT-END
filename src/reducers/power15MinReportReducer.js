import { FETCH_15_MIN_POWER_REPORT } from "../actions/power15MinReportData";

const initialState = {
  year: null,
  month: null,
  data: null,
  transgressions: []
};

export const power15MinReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_15_MIN_POWER_REPORT:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
        data: action.payload.data,
        transgressions: action.payload.transgressions
      };

    default: {
      return state;
    }
  }
};
