import { getAggregateData } from "./mindsphereService";
import { exists, existsAndIsNotEmpty, snooze } from "../utils/utilities";
import _ from "lodash";

const assetIdRGPZO = "a5eebd59cd1348c5b38f8d74ab432780";

const breakerActiveEnergyImportVariableName = "Active_energy_import";
const breakerActiveEnergyExportVariableName = "Active_energy_export";
const breakerReactiveEnergyImportVariableName = "Reactive_energy_import";
const breakerReactiveEnergyExportVariableName = "Reactive_energy_export";

const breakerActivePowerImportVariableName = "Active_power_import_15_min";
const breakerActivePowerExportVariableName = "Active_power_export_15_min";
const breakerReactivePowerImportVariableName = "Reactive_power_import_15_min";
const breakerReactivePowerExportVariableName = "Reactive_power_export_15_min";

const pacActiveEnergyImportVariableName = "Active_energy_import";
const pacActiveEnergyExportVariableName = "Active_energy_export";
const pacReactiveEnergyImportVariableName = "Reactive_energy_import";
const pacReactiveEnergyExportVariableName = "Reactive_energy_export";

const pacActivePowerImportVariableName = "Total_active_power_import";
const pacActivePowerExportVariableName = "Total_active_power_export";
const pacReactivePowerImportVariableName = "Total_reactive_power_import";
const pacReactivePowerExportVariableName = "Total_reactive_power_export";

const numberOfDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getElement1minAspectName = elementName => {
  return elementName + "_1_min";
};

const getElement15minAspectName = elementName => {
  return elementName + "_15_min";
};

const getElement1sAspectName = elementName => {
  return elementName + "_1_s";
};

const isAggregatedBreakerDataValid = data => {
  if (!existsAndIsNotEmpty(data)) return false;

  if (!exists(data[breakerActiveEnergyImportVariableName])) return false;
  if (!exists(data[breakerActiveEnergyExportVariableName])) return false;
  if (!exists(data[breakerReactiveEnergyImportVariableName])) return false;
  if (!exists(data[breakerReactiveEnergyExportVariableName])) return false;

  if (!exists(data[breakerActiveEnergyImportVariableName]["lasttime"]))
    return false;
  if (!exists(data[breakerActiveEnergyExportVariableName]["lasttime"]))
    return false;
  if (!exists(data[breakerReactiveEnergyImportVariableName]["lasttime"]))
    return false;
  if (!exists(data[breakerReactiveEnergyExportVariableName]["lasttime"]))
    return false;

  if (
    data[breakerActiveEnergyImportVariableName]["lasttime"] !==
    data[breakerActiveEnergyExportVariableName]["lasttime"]
  )
    return false;

  if (
    data[breakerActiveEnergyImportVariableName]["lasttime"] !==
    data[breakerReactiveEnergyImportVariableName]["lasttime"]
  )
    return false;

  if (
    data[breakerActiveEnergyImportVariableName]["lasttime"] !==
    data[breakerReactiveEnergyExportVariableName]["lasttime"]
  )
    return false;

  return true;
};

const convertAggregatedDataToBreakerData = aggregatedData => {
  let dataToReturn = {};

  for (let data of aggregatedData) {
    if (isAggregatedBreakerDataValid(data)) {
      let date = new Date(
        data[breakerActiveEnergyImportVariableName]["lasttime"]
      ).getTime();

      dataToReturn[date] = {
        activeEnergyImport:
          data[breakerActiveEnergyImportVariableName]["lastvalue"] * 1000,
        activeEnergyExport:
          data[breakerActiveEnergyExportVariableName]["lastvalue"] * 1000,
        reactiveEnergyImport:
          data[breakerReactiveEnergyImportVariableName]["lastvalue"] * 1000,
        reactiveEnergyExport:
          data[breakerReactiveEnergyExportVariableName]["lastvalue"] * 1000
      };
    }
  }

  return dataToReturn;
};

const convertAggregatedDataToPACData = aggregatedData => {
  let dataToReturn = {};

  for (let data of aggregatedData) {
    if (isAggregatedBreakerDataValid(data)) {
      let date = new Date(
        data[pacActiveEnergyImportVariableName]["lasttime"]
      ).getTime();

      dataToReturn[date] = {
        activeEnergyImport:
          data[pacActiveEnergyImportVariableName]["lastvalue"],
        activeEnergyExport:
          data[pacActiveEnergyExportVariableName]["lastvalue"],
        reactiveEnergyImport:
          data[pacReactiveEnergyImportVariableName]["lastvalue"],
        reactiveEnergyExport:
          data[pacReactiveEnergyExportVariableName]["lastvalue"]
      };
    }
  }

  return dataToReturn;
};

const getBreakerEnergyMonthly = (breakerName, year, month) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fromDate = new Date(year, month, 0);
      let numberOfDays = numberOfDaysInMonth(month, year);
      let toDate = new Date(
        fromDate.getTime() + (numberOfDays + 1) * 24 * 60 * 60 * 1000
      );

      let agregatedData = await getAggregateData(
        assetIdRGPZO,
        getElement1minAspectName(breakerName),
        [
          breakerActiveEnergyImportVariableName,
          breakerActiveEnergyExportVariableName,
          breakerReactiveEnergyImportVariableName,
          breakerReactiveEnergyExportVariableName
        ],
        fromDate.toISOString(),
        toDate.toISOString(),
        1,
        "day"
      );

      let data = convertAggregatedDataToBreakerData(agregatedData);

      return resolve(data);
    } catch (err) {
      return reject(err);
    }
  });
};

const getPACEnergyMonthly = (pacName, year, month) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fromDate = new Date(year, month, 0);
      let numberOfDays = numberOfDaysInMonth(month, year);
      let toDate = new Date(
        fromDate.getTime() + (numberOfDays + 1) * 24 * 60 * 60 * 1000
      );

      let agregatedData = await getAggregateData(
        assetIdRGPZO,
        getElement1minAspectName(pacName),
        [
          pacActiveEnergyImportVariableName,
          pacActiveEnergyExportVariableName,
          pacReactiveEnergyImportVariableName,
          pacReactiveEnergyExportVariableName
        ],
        fromDate.toISOString(),
        toDate.toISOString(),
        1,
        "day"
      );

      let data = convertAggregatedDataToPACData(agregatedData);

      return resolve(data);
    } catch (err) {
      return reject(err);
    }
  });
};

export async function getEnergyMonthly(year, month) {
  const getBreakerEnergyAction = (breakerName, year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await getBreakerEnergyMonthly(breakerName, year, month));
      } catch (err) {
        return reject(err);
      }
    });
  };

  const getPACEnergyAction = (PACName, year, month) => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await getPACEnergyMonthly(PACName, year, month));
      } catch (err) {
        return reject(err);
      }
    });
  };

  let elementNames = [
    "1F1",
    "1F2",
    "1F3",
    "1F4",
    "1F5",
    "1F6",
    "1F7",
    "1FP1",
    "1FP2",
    "2F1",
    "2F2",
    "2F3",
    "2F4",
    "2F5",
    "2F6",
    "2FP1",
    "2FP2",
    "3F1",
    "3F2",
    "TR1",
    "TR2",
    "GEN"
  ];

  let allActions = [
    getBreakerEnergyAction(elementNames[0], year, month),
    getBreakerEnergyAction(elementNames[1], year, month),
    getBreakerEnergyAction(elementNames[2], year, month),
    getBreakerEnergyAction(elementNames[3], year, month),
    getBreakerEnergyAction(elementNames[4], year, month),
    getBreakerEnergyAction(elementNames[5], year, month),
    getBreakerEnergyAction(elementNames[6], year, month),
    getBreakerEnergyAction(elementNames[7], year, month),
    getBreakerEnergyAction(elementNames[8], year, month),
    getBreakerEnergyAction(elementNames[9], year, month),
    getBreakerEnergyAction(elementNames[10], year, month),
    getBreakerEnergyAction(elementNames[11], year, month),
    getBreakerEnergyAction(elementNames[12], year, month),
    getBreakerEnergyAction(elementNames[13], year, month),
    getBreakerEnergyAction(elementNames[14], year, month),
    getBreakerEnergyAction(elementNames[15], year, month),
    getBreakerEnergyAction(elementNames[16], year, month),
    getBreakerEnergyAction(elementNames[17], year, month),
    getBreakerEnergyAction(elementNames[18], year, month),
    getPACEnergyAction(elementNames[19], year, month),
    getPACEnergyAction(elementNames[20], year, month),
    getPACEnergyAction(elementNames[21], year, month)
  ];

  let allData = await Promise.all(allActions);

  let dataToReturn = {};

  for (let i = 0; i < elementNames.length; i++) {
    let elementName = elementNames[i];
    let elementData = allData[i];
    dataToReturn[elementName] = elementData;
  }

  return dataToReturn;
}
