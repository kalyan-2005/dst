"use client";
import React, { useState, useEffect } from "react";
import { DatePickerDemo } from "./datePicker";
import LineChart from "./lineChart";
import axios from "axios";

function Linechart({selectedSensor}: any) {
  const [date, setDate] = useState<Date | null>(null);

  // ***DUMMY DATA***
  // const data1 = [12, 19, 3, 5, 2, 3]; // Replace with your first dataset
  // const data2 = [22, 29, 13, 15, 12, 13]; // Replace with your second dataset
  // const labels = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"]; // Time labels

  const [data, setData] = useState<any>([]);

  // Set the date on the client after the initial render
  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(selectedSensor.link);
        setData(response.data.feeds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedSensor]);
  // filter to selected date
  const filteredData = data.filter((item: any) => {
    const itemDate = new Date(item.created_at);
    return (
      itemDate.getDate() === date?.getDate() &&
      itemDate.getMonth() === date?.getMonth() &&
      itemDate.getFullYear() === date?.getFullYear()
    );
  });

  // ***SENSOR DATA***
  const data1 = filteredData.map((item: any) => item.field1);
  const data2 = filteredData.map((item: any) => item.field2);
  const labels = filteredData.map((item: any) => {
    const itemDate = new Date(item.created_at);
    return itemDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
      timeZone: "Asia/Kolkata", // Set timezone to IST
    });

  });
  return (
    <div className="p-4 rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Sensor {selectedSensor?.name}</h1>
        <DatePickerDemo date={date} setDate={setDate} />
      </div>
      <div className="">
        {/* {date && <h1>{JSON.stringify(date)}</h1>} */}
        <LineChart data1={data1} data2={data2} labels={labels} />
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default Linechart;
