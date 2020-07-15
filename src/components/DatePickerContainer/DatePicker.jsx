import React, { useMemo } from "react";
import { startOfToday, format } from "date-fns";

import { DatePicker as BronsonDatePicker } from "bronson-react/dist";
import "./DatePicker.scss";
import PropTypes from "prop-types";

const formatDate = (date) => format(new Date(date), "MM/dd/Y");

const DatePicker = ({
  value = startOfToday(),
  availableDates,
  disabledDates,
  dueDates,
  onChange,
}) => {
  const formattedAvailableDates = useMemo(
    () => (availableDates || []).map((date) => formatDate(date)),
    [availableDates]
  );
  const formattedDisabledDates = useMemo(
    () => disabledDates.map((date) => formatDate(date)),
    [disabledDates]
  );
  const formatteddDueDates = useMemo(
    () => dueDates.map((date) => formatDate(date)),
    [dueDates]
  );

  return (
    <BronsonDatePicker
      dateFormat="m/d/Y"
      onChange={(date) => {
        onChange(new Date(date));
      }}
      minDate={startOfToday()}
      value={formatDate(value)}
      flatpickrOptions={{
        disable: [
          (date) => {
            const dateString = formatDate(date);

            if (availableDates) {
              return !formattedAvailableDates.includes(dateString);
            }

            return formattedDisabledDates.includes(dateString);
          },
        ],
        dateFormat: "m/d/Y",
        onDayCreate: (dObj, dStr, fp, dayElem) => {
          const elementDate = formatDate(dayElem.dateObj);
          const selectedDate = formatDate(value);

          if (selectedDate === elementDate) {
            dayElem.classList.add("selected-day");
          }

          if (formatteddDueDates.includes(elementDate)) {
            dayElem.classList.add("due-day"); // eslint-disable-line
            dayElem.innerHTML += '<span class="due-text">Due</span>'; // eslint-disable-line
          }
        },
      }}
    />
  );
};

const evaluateStringOrInstanceOfDate = (propValue) => {
  let returnValue;

  if (typeof propValue !== "string" || !(propValue instanceof Date)) {
    returnValue = new Error("Inavlid Date Supplied");
  }

  return returnValue;
};

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  availableDates: PropTypes.arrayOf(evaluateStringOrInstanceOfDate),
  disabledDates: PropTypes.arrayOf(evaluateStringOrInstanceOfDate),
  dueDates: PropTypes.arrayOf(evaluateStringOrInstanceOfDate),
  onChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  availableDates: null,
  disabledDates: [],
  dueDates: [],
};

export default DatePicker;
