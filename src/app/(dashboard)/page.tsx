import { getCurrentUser } from "@/actions/getCurrentUser";
import Linechart from "@/components/line-chart";
import Link from "next/link";
import { TiWarning } from "react-icons/ti";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div>
      <div className="mx-32 flex gap-8 mt-4 min-h-[300px]">
        {/* chart */}
        <div className="w-1/2 shadow-md rounded">
          <Linechart selectedSensor={user?.sensor} />
        </div>
        {/* image */}
        <div className="w-1/2 shadow-md rounded p-4 flex flex-col gap-6 justify-end">
          <div className="flex justify-between mx-10">
            <div className="p-6 px-8 rounded-xl border-2 border-black relative">
              <h1 className="absolute text-sm font-semibold -top-3 left-3 bg-background px-2">
                Water Pressure
              </h1>
              <h1 className="text-4xl font-black">
                4.53 <span className="text-lg">psi</span>
              </h1>
            </div>
            <div className="p-6 px-8 rounded-xl border-2 border-black relative">
              <h1 className="absolute text-sm font-semibold -top-3 left-3 bg-background px-2">
                Water Flowrate
              </h1>
              <h1 className="text-4xl font-black">
                2.68 <span className="text-lg">gpm</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 mx-10">
            <TiWarning className="text-3xl" />
            <div className="w-full overflow-hidden whitespace-nowrap">
              <div className="animate-marquee inline-block">
                <span className="text-xl font-bold mx-4">
                  Low water supply is detected &nbsp;
                </span>
              </div>
            </div>
            <Link href={"/report"} className="bg-primary rounded p-1 px-2 text-white">Report</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
