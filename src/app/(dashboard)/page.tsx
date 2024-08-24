import axios from "axios";

export default async function Home() {
  const flowrates = await axios
    .get(
      "https://api.thingspeak.com/channels/2629854/fields/3.json?api_key=J74065WFYJRPMLK3"
    )
    .then((res) => res.data);
  return (
    <div className="">
      <pre>{JSON.stringify(flowrates, null, 2)}</pre>
    </div>
  );
}
