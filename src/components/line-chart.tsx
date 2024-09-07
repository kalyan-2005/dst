"use client";
import React, { useState, useEffect } from "react";
import { DatePickerDemo } from "./datePicker";
import LineChart from "./lineChart";

function Linechart() {
  const [date, setDate] = useState<Date | null>(null);
  const data1 = [12, 19, 3, 5, 2, 3]; // Replace with your first dataset
  const data2 = [22, 29, 13, 15, 12, 13]; // Replace with your second dataset
  const labels = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"]; // Time labels

  // Set the date on the client after the initial render
  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div className="w-1/2 p-4 rounded shadow-md">
      <div className="flex justify-end">
        <DatePickerDemo date={date} setDate={setDate} />
      </div>
      <div className="">
        {/* {date && <h1>{JSON.stringify(date)}</h1>} */}
        <LineChart data1={data1} data2={data2} labels={labels} />
      </div>
    </div>
  );
}

export default Linechart;
