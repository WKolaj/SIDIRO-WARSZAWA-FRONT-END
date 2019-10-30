export function exists(object) {
  return object !== null && object !== undefined;
}

export function roundToSpecifiedPlaces(number, places) {
  return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
}

export function snooze(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isEmpty(obj) {
  if (obj === "" || obj === {} || obj === []) return false;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

//Method for checking if object is empty
export function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function existsAndIsNotEmpty(object) {
  return exists(object) && !isObjectEmpty(object);
}

const roundDateToDays = date => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

export function validateEndDate(endDate, fromDate) {
  let maxFutureDays = 2;

  let nowDate = new Date(Date.now());

  let currentDayDate = roundDateToDays(nowDate);

  let maxFutureOffsetDate = new Date(
    currentDayDate.getTime() + maxFutureDays * 24 * 60 * 60 * 1000
  );

  let dateToReturn = endDate;

  //Setting date as maxFutureOffsetDate if it is greater than max offset of date
  if (endDate.getTime() > maxFutureOffsetDate.getTime())
    dateToReturn = maxFutureOffsetDate;

  //Checking if there is a difference in time zone offsets and adjusting the difference

  let fromDateTimeZoneOffset = fromDate.getTimezoneOffset();
  let endDateTimeZoneOffset = dateToReturn.getTimezoneOffset();

  if (fromDateTimeZoneOffset !== endDateTimeZoneOffset) {
    dateToReturn = new Date(
      dateToReturn.getTime() +
        (endDateTimeZoneOffset - fromDateTimeZoneOffset) * 60 * 1000
    );
  }

  return dateToReturn;
}
