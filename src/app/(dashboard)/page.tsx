import Linechart from "@/components/line-chart";
import axios from "axios";

export default async function Home() {
  const flowrates = await axios
    .get(
      "https://api.thingspeak.com/channels/2629854/feeds.json?api_key=J74065WFYJRPMLK3"
    )
    .then((res) => res.data);
  return (
    <div>
      <div className="mx-32 flex gap-8 mt-4">
        {/* chart */}
        <Linechart/>
        {/* image */}
        <div className="w-1/2 shadow-md rounded">hii</div>
      </div>
      <pre>{JSON.stringify(flowrates, null, 2)}</pre>
    </div>
  );
}
