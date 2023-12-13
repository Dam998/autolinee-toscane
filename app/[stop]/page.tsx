import Link from "next/link";
import { getRouteInfo, getStopTimes, getStops } from "../api/stop";
import dayjs from "dayjs";

interface IProps {
  params: {
    stop: string;
  };
}

export default async function StopPage({ params: { stop } }: IProps) {
  // const stopTimes = await getStopTimes(stop);
  const stopTimes = await getStops(stop);

  if (!stopTimes.stopAreas || Object.values(stopTimes.stopAreas).length === 0) {
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

  let stopName = stopTimes.stopAreas[0].stopArea.name;

  const toDisplay: {
    [key: string]: {
      name: string;
      destinations: {
        name: string;
        times: {
          time: number;
          realTime: boolean;
        }[];
      }[];
    };
  } = {};
  stopTimes.stopAreas.forEach(({ lines }) => {
    lines.forEach(({ directions, line }) => {
      let lineName = line.sName;
      if (!toDisplay[lineName]) {
        toDisplay[lineName] = {
          name: lineName,
          destinations: [],
        };
      }

      directions.forEach(({ times }) => {
        times.forEach(({ departureWait, destinationDisplay, realTime }) => {
          let found = toDisplay[lineName].destinations.find(
            (dest) => dest.name === destinationDisplay
          );

          if (!found) {
            found = {
              name: destinationDisplay,
              times: [],
            };
            toDisplay[lineName].destinations.push(found);
          }

          found.times.push({
            time: departureWait,
            realTime: !!realTime,
          });
        });
      });
    });
  });

  // const routeId = Object.values(stopTimes.items)[0]?.RouteId;
  // const routeInfo = await getRouteInfo(routeId);

  // let stopName = "";
  // if (!!routeInfo?.directions) {
  //   for (const dir of routeInfo?.directions) {
  //     if (!dir.stopPoints) continue;

  //     for (const sp of dir.stopPoints) {
  //       if (sp.id === `AUTOLINEE:${stop}`) {
  //         stopName = sp.name;
  //         break;
  //       }
  //     }
  //   }
  // }

  const formatDepartureTime = (time: number) => {
    const minutes = Math.trunc(time / 60);

    if (minutes < 1) {
      return "<1 min";
    }

    return `${minutes} min`;
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold sm:text-center text-left">
        Fermata: {stopName || stop}
        <br />
        {/* Ultimo aggiornamento: {stopTimes?.infos?.results_date_time} */}
      </h1>
      <table className="w-full text-left border dark:border-gray-500 border-gray-200 rounded-2xl overflow-hidden">
        <thead>
          <tr className="dark:bg-gray-500 bg-gray-200">
            <th className="py-3 ps-5">LINEA</th>
            <th className="py-3 ps-5" colSpan={2}>
              DESTINAZIONE
            </th>
          </tr>
        </thead>
        <tbody className="dark:bg-black bg-zinc-50">
          {Object.values(toDisplay).map(({ destinations, name }) => {
            // if (Schedule.length === 0) return null;

            // const { to_stop_name } = Schedule[0];

            return (
              <tr
                key={name}
                className="border-t-2 first:border-none dark:border-gray-500 border-gray-200"
              >
                <td className="py-3 ps-5 font-bold">{name}</td>
                <td className="ps-5 font-bold" colSpan={2}>
                  <table className="w-full">
                    <tbody>
                      {destinations.map(({ name: destName, times }) => {
                        return (
                          <tr
                            className="border-b-2 last:border-none dark:border-gray-500 border-gray-200"
                            key={destName}
                          >
                            <td className="py-2">{destName}</td>
                            <td className="flex flex-col items-end py-2 pe-5">
                              {times.map(({ realTime, time }) => {
                                return (
                                  <span
                                    key={time}
                                    className={
                                      realTime
                                        ? "dark:text-green-400 text-green-600"
                                        : ""
                                    }
                                  >
                                    {formatDepartureTime(time)}
                                  </span>
                                );
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
                {/* <td className="py-3 ps-5 font-bold">
                  <div className="flex flex-col">
                    {times.map(({ realTime, time }) => {
                      return (
                        <span
                          key={time}
                          className={realTime ? "text-green-400" : ""}
                        >
                          {formatDepartureTime(time)}
                        </span>
                      );
                    })}
                  </div>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
