import { FETCH_SUPPLY_QUALITY_REPORT } from "../actions/supplyQualityReportData";

const initialState = {
  year: null,
  month: null,
  data: null
};

export const supplyQualityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUPPLY_QUALITY_REPORT:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
        data: action.payload.data
      };
    default: {
      return state;
    }
  }
};
