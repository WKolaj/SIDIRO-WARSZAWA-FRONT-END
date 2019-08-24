import _ from "lodash";
import { getPowerMonthly } from "../services/rgPZOService";

import { getPowermonitorDataActionCreator } from "./powermonitorData";

import {
  hideBusyDialogActionCreator,
  showBusyDialogActionCreator
} from "./busyDialog";

import { exists, snooze } from "../utils/utilities";

import { enqueueSnackbar } from "./snackbar";

const normalizeData = monthlyPowerData => {
  let dataToReturn = {};

  let allElements = Object.keys(monthlyPowerData);

  for (let element of allElements) {
    let allDates = Object.keys(monthlyPowerData[element]);

    dataToReturn[element] = {
      data: [],
      maxValue: null,
      maxDate: null
    };

    if (allDates.length > 0) {
      let value = monthlyPowerData[element][allDates[0]].value / 1000;
      let date = monthlyPowerData[element][allDates[0]].date;

      dataToReturn[element].data.push({
        value,
        date
      });

      dataToReturn[element].maxValue = value;
      dataToReturn[element].maxDate = date;

      for (let i = 1; i < allDates.length; i++) {
        value = monthlyPowerData[element][allDates[i]].value / 1000;
        date = monthlyPowerData[element][allDates[i]].date;

        dataToReturn[element].data.push({
          value,
          date
        });

        if (value > dataToReturn[element].maxValue) {
          dataToReturn[element].maxValue = value;
          dataToReturn[element].maxDate = date;
        }
      }
    }
  }

  return dataToReturn;
};

const getTotalPowerAndTransformersData = (
  monthlyPowerData,
  trafoPowerLosses
) => {
  let dataToReturn = {
    total: {
      data: [],
      maxValue: null,
      maxDate: null
    },

    transformers: {
      data: [],
      maxValue: null,
      maxDate: null
    }
  };

  if (!exists(monthlyPowerData["TR1"])) return dataToReturn;
  if (!exists(monthlyPowerData["TR2"])) return dataToReturn;

  let allTR1Dates = Object.keys(monthlyPowerData["TR1"]);
  let allTR2Dates = Object.keys(monthlyPowerData["TR2"]);

  let allDates = _.union(allTR1Dates, allTR2Dates);

  for (let date of allDates) {
    let tr1Data = monthlyPowerData["TR1"][date];
    let tr2Data = monthlyPowerData["TR2"][date];

    if (exists(tr1Data) && exists(tr2Data)) {
      let totalPower =
        tr1Data.value / 1000 + tr2Data.value / 1000 + trafoPowerLosses;
      let newDate = new Date(parseInt(date));

      dataToReturn["total"].data.push({
        value: totalPower,
        date: newDate
      });

      if (exists(dataToReturn["total"].maxValue)) {
        if (totalPower > dataToReturn["total"].maxValue) {
          dataToReturn["total"].maxValue = totalPower;
          dataToReturn["total"].maxDate = newDate;
        }
      } else {
        dataToReturn["total"].maxValue = totalPower;
        dataToReturn["total"].maxDate = newDate;
      }
    }

    //trafo power is stable and simulated - get only first value
    if (!exists(dataToReturn["transformers"].maxValue)) {
      dataToReturn["transformers"].maxValue = trafoPowerLosses;
      dataToReturn["transformers"].maxDate = new Date(parseInt(date));
    }

    dataToReturn["transformers"].data.push({
      value: trafoPowerLosses,
      date: new Date(parseInt(date))
    });
  }

  return dataToReturn;
};

export const FETCH_15_MIN_POWER_REPORT = "FETCH_15_MIN_POWER_REPORT";

export const fetch15MinPowerReportActionCreator = function(year, month) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());

      await dispatch(getPowermonitorDataActionCreator());

      let trafoLosses = getState().powermonitor.data.trafoPowerLosses;

      let data = await getPowerMonthly(year, month);

      let normalizedData = normalizeData(data);
      let trafoAndTotalPower = getTotalPowerAndTransformersData(
        data,
        trafoLosses
      );

      let normalizedDataWithTotalAndTrafo = {
        ...normalizedData,
        ...trafoAndTotalPower
      };

      //Also updating data according to response
      await dispatch({
        type: FETCH_15_MIN_POWER_REPORT,
        payload: {
          data: normalizedDataWithTotalAndTrafo,
          year,
          month
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
