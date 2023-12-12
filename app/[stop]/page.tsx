import { getRouteInfo, getStopTimes } from "../api/stop";

interface IProps {
  params: {
    stop: string;
  };
}

export default async function StopPage({ params: { stop } }: IProps) {
  const stopTimes = await getStopTimes(stop);

  const routeId = Object.values(stopTimes.items)[0].RouteId;
  const routeInfo = await getRouteInfo(routeId);

  let stopName = "";
  for (const dir of routeInfo.directions) {
    for (const sp of dir.stopPoints) {
      if (sp.id === `AUTOLINEE:${stop}`) {
        stopName = sp.name;
        break;
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="text-xl font-bold text-center">
        Fermata: {stopName}
        <br />
        Ultimo aggiornamento: {stopTimes.infos.results_date_time}
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
                      return (
                        <div key={realTime || ArrTime}>
                          {realTime || ArrTime}
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
