import React, { useState } from "react";
// import { startOfToday, addDays } from "date-fns";
import { DatePicker } from "antd";
// import DatePicker from "../components/common/date-picker/DatePicker";

const DatePickerContainer = () => {
  const [selectedDate1, setSelectedDate1] = useState();
  const [selectedDate2, setSelectedDate2] = useState();
  const [selectedDate3, setSelectedDate3] = useState();

  // const nextDay = addDays(startOfToday(), 1);

  return (
    <div style={{ padding: 10 }}>
      <DatePicker onChange={setSelectedDate1} role="input" />
      {/* <p>With Due Dates</p>
      <DatePicker
        value={selectedDate1}
        onChange={(date) => setSelectedDate1(date)}
        dueDates={["06/19/2020", "06/30/2020"]}
      />
      <br />
      <p>With just next day as available date</p>
      <DatePicker
        value={selectedDate2}
        onChange={(date) => setSelectedDate2(date)}
        availableDates={[nextDay]}
      />

      <br />
      <p>With just next day as disabled date</p>
      <DatePicker
        value={selectedDate3}
        onChange={(date) => setSelectedDate3(date)}
        disabledDates={[nextDay]}
      /> */}
    </div>
  );
};

export default DatePickerContainer;
