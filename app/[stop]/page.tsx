import { getStopTimes } from "../api/stop";

interface IProps {
  params: {
    stop: string;
  };
}

export default async function StopPage({ params: { stop } }: IProps) {
  const stopTimes = await getStopTimes(stop);
  console.log(stopTimes);
  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="text-xl">
        Fermata: {stop}
        <br />
        Ultimo aggiornamento: {stopTimes.infos.results_date_time}
      </h1>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-black-light">
            <th className="py-3 ps-5">LINEA</th>
            <th className="py-3 ps-5">DESTINAZIONE</th>
            <th className="py-3 ps-5">PROSSIMI ORARI</th>
          </tr>
        </thead>
        <tbody className="bg-black-dark">
          {Object.values(stopTimes.items).map(({ ShortName, Schedule }) => {
            if (Schedule.length === 0) return null;

            const { to_stop_name } = Schedule[0];

            if (!Schedule.some(({ realTime }) => realTime)) return null;

            return (
              <tr
                key={ShortName + to_stop_name}
                className="border-t border-black-light"
              >
                <td className="py-3 ps-5 font-bold">{ShortName}</td>
                <td className="py-3 ps-5 font-bold">{to_stop_name}</td>
                <td className="py-3 ps-5 font-bold">
                  <div className="flex flex-col">
                    {Schedule.map(({ realTime }) => {
                      return (
                        <div key={realTime}>{realTime ? realTime : ""}</div>
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
