import Link from "next/link";
import { getRouteInfo, getStopTimes } from "../api/stop";
import dayjs from "dayjs";

interface IProps {
  params: {
    stop: string;
  };
}

export default async function StopPage({ params: { stop } }: IProps) {
  const stopTimes = await getStopTimes(stop);

  if (!stopTimes.items || Object.values(stopTimes.items).length === 0) {
    return (
      <div className="flex flex-col gap-4 text-center items-center font-bold">
        <h1 className="text-2xl">Fermata non trovata</h1>
        <Link href="/">
          <div className="px-4 py-2 w-fit rounded-2xl border">
            {"<- Indietro"}
          </div>
        </Link>
      </div>
    );
  }

  const routeId = Object.values(stopTimes.items)[0]?.RouteId;
  const routeInfo = await getRouteInfo(routeId);

  let stopName = "";
  if (!!routeInfo?.directions) {
    for (const dir of routeInfo?.directions) {
      if (!dir.stopPoints) continue;

      for (const sp of dir.stopPoints) {
        if (sp.id === `AUTOLINEE:${stop}`) {
          stopName = sp.name;
          break;
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-center sm:text-left">
        Fermata: {stopName || stop}
        <br />
        Ultimo aggiornamento: {stopTimes?.infos?.results_date_time}
      </h1>
      <table className="w-full text-left border dark:border-gray-500 border-gray-200 rounded-2xl overflow-hidden">
        <thead>
          <tr className="dark:bg-gray-500 bg-gray-200">
            <th className="py-3 ps-5">LINEA</th>
            <th className="py-3 ps-5">DESTINAZIONE</th>
            <th className="py-3 ps-5">PROSSIMI ORARI</th>
          </tr>
        </thead>
        <tbody className="dark:bg-black bg-zinc-50">
          {Object.values(stopTimes.items).map(({ ShortName, Schedule }) => {
            if (Schedule.length === 0) return null;

            const { to_stop_name } = Schedule[0];

            return (
              <tr
                key={ShortName + to_stop_name}
                className="border-t dark:border-gray-500 border-gray-200"
              >
                <td className="py-3 ps-5 font-bold">{ShortName}</td>
                <td className="py-3 ps-5 font-bold">{to_stop_name}</td>
                <td className="py-3 ps-5 font-bold">
                  <div className="flex flex-col">
                    {Schedule.map(({ realTime, ArrTime }) => {
                      console.log(ArrTime);
                      return (
                        <div key={realTime || ArrTime}>
                          {realTime || ArrTime.split(" ")[1]}
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
