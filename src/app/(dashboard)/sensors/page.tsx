import { getAllSensors } from "@/actions/getCurrentUser";
import SensorHeader from "@/components/sensor-header";
import React from "react";

async function page() {
  const sensors = await getAllSensors();
  return (
    <div className="m-4">
      {/* Flexbox container for side-by-side layout */}
      <SensorHeader sensors={sensors} />
      {/* Pre element for debugging */}
    </div>
  );
}

export default page;
