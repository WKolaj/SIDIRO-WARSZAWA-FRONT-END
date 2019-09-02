import { displayTimeRange } from "./index";
import { enqueueSnackbar } from "./snackbar";

export const CHANGE_REPORT_PAGE = "CHANGE_REPORT_PAGE";

export const changeReportPageActionCreator = function(pageNumber) {
  return {
    type: CHANGE_REPORT_PAGE,
    payload: {
      pageNumber
    }
  };
};

const getDeviceName = element => {
  if (element === "TR1" || element === "TR2" || element === "GEN")
    return element;

  return `cb_${element}`;
};

const getBreakerName = element => {
  if (element === "TR1") return "Q1";
  if (element === "TR2") return "Q2";
  if (element === "GEN") return "Q3";

  return element;
};

const getTabName = variableName => {
  if (
    variableName === "CurrentL1" ||
    variableName === "CurrentL2" ||
    variableName === "CurrentL3" ||
    variableName === "UnbalanceCurrent"
  )
    return "currentTab";
  if (
    variableName === "VoltageL1N" ||
    variableName === "VoltageL2N" ||
    variableName === "VoltageL3N" ||
    variableName === "UnbalanceVoltage"
  )
    return "voltageLNTab";
  if (
    variableName === "VoltageL1L2" ||
    variableName === "VoltageL2L3" ||
    variableName === "VoltageL3L1"
  )
    return "voltageLLTab";
  if (
    variableName === "THDCurrentL1" ||
    variableName === "THDCurrentL2" ||
    variableName === "THDCurrentL3"
  )
    return "THDItab";
  if (
    variableName === "THDVoltageL1" ||
    variableName === "THDVoltageL2" ||
    variableName === "THDVoltageL3"
  )
    return "THDUtab";

  return null;
};

const getDeviceSection = (element, t) => {
  if (element === "TR1") return `${t("slideUpDialogCircuitTransformer")} TR1`;

  if (element === "TR2") return `${t("slideUpDialogCircuitTransformer")} TR2`;

  if (element === "GEN") return `Generator`;

  if (
    element === "1F1" ||
    element === "1F2" ||
    element === "1F3" ||
    element === "1F4" ||
    element === "1F5" ||
    element === "1F6" ||
    element === "1F7" ||
    element === "1FP1" ||
    element === "1FP2"
  )
    return `${t("slideUpDialogCircuitSection")} TR1`;

  if (
    element === "2F1" ||
    element === "2F2" ||
    element === "2F3" ||
    element === "2F4" ||
    element === "2F5" ||
    element === "2F6" ||
    element === "2FP1" ||
    element === "2FP2"
  )
    return `${t("slideUpDialogCircuitSection")} TR2`;

  if (element === "3F1" || element === "3F2")
    return `${t("slideUpDialogCircuitSection")} GEN`;

  return null;
};

const getDeviceFeeder = (element, t) => {
  if (element === "TR1") return `${t("slideUpDialogCircuitSection")} TR1`;

  if (element === "TR2") return `${t("slideUpDialogCircuitSection")} TR2`;

  if (element === "GEN") return `${t("slideUpDialogCircuitSection")} GEN`;

  if (element === "3F2") return `Budynek 01 - MSG`;
  if (element === "3F1") return `Budynek 2 - serwer.`;
  if (element === "1F7") return `Budynek 1B - P1`;
  if (element === "1F6") return `Budynek 2 - RG`;
  if (element === "1F5") return `Budynek 3 - RG`;
  if (element === "1F4") return `Budynek 1A - klim.`;
  if (element === "1F3") return `Budynek 1A - komp.`;
  if (element === "1F2") return `Budynek 3 - komp.`;
  if (element === "1F1") return `Budynek 01 - MSB1`;
  if (element === "2F6") return `Parking`;
  if (element === "2F5") return `Budynek 1A`;
  if (element === "2F4") return `Budynek 2 - R1`;
  if (element === "2F3") return `Budynek 01 - MSB2`;
  if (element === "2F2") return `Budynek 2 - RG`;
  if (element === "2F1") return `Budynek 1B - P2`;
  if (element === "2FP1") return `Budynek 01 - MSF`;
  if (element === "2FP2") return `RPZOK`;
  if (element === "1FP1") return `Budynek 01 - MS`;
  if (element === "1FP2") return `RPZOK`;

  return null;
};

export const showTrendSlider = function(elementName, variableName, date, t) {
  let deviceName = getDeviceName(elementName);
  let breakerName = getBreakerName(elementName);
  let deviceSection = getDeviceSection(elementName, t);
  let deviceFeeder = getDeviceFeeder(elementName, t);
  let tabName = getTabName(variableName);
  let timerangeISOString = date.toISOString();

  return async function(dispatch, getState) {
    try {
      await dispatch(
        displayTimeRange(
          deviceName,
          breakerName,
          deviceSection,
          deviceFeeder,
          tabName,
          timerangeISOString
        )
      );
    } catch (err) {
      await dispatch(
        enqueueSnackbar({ message: err.message, options: { variant: "error" } })
      );
    }
  };
};
