import dayjs from "dayjs";
import axiosInstance from ".";
import it from "dayjs/locale/it";

dayjs.locale(it);

interface IStopTimes {
  infos: {
    results_date_time: string;
  };
  items: {
    [key: string]: {
      ShortName: string;
      LongName: string;
      Order: string;
      Type: string;
      Picto: string;
      PictoLine: string;
      School: string;
      Categ: string;
      Color: string;
      ColorText: string;
      RouteId: string;
      Schedule: {
        ServiceId: string;
        ShapeId: string;
        sequenceId: string;
        journeyId: string;
        ArrTime: string;
        DepTime: string;
        tripHeadsign: string;
        wheelchair_accessible: null;
        from_stop_name: string;
        to_stop_name: string;
        pickup: string;
        dropOff: string;
        tad: boolean;
        DepTerm: string;
        realTime?: string | null;
        Live: {
          type: number;
          equipment: string;
          reliability: string;
          time: string;
        };
      }[];
      Direction: string;
      DirLib: string;
      DirTexte: string;
      DirLabel: string;
    };
  };
}

function formatDate(date = new Date()) {
  const year = date.toLocaleString("it-IT", { year: "numeric" });
  const month = date.toLocaleString("it-IT", {
    month: "2-digit",
  });
  const day = date.toLocaleString("it-IT", { day: "2-digit" });

  return [year, month, day].join("-");
}

export const getStopTimes = async (stop: string): Promise<IStopTimes> => {
  const currentDate = dayjs();
  console.log("Current date: ", dayjs().format("YYYY/MM/DD"));
  console.log("Current time: ", dayjs().format("HH:mm:ss"));
  const response = await axiosInstance.get(
    "/it/pthv/get/stop-stoptimes-discovery",
    {
      params: {
        nbtimes: 2,
        stop,
        reseau: "",
        date: currentDate.format("YYYY-MM-DD"),
        heure: currentDate.format("HH:mm:ss"),
        nbpasttimes: 0,
        pastsince: 480,
      },
    }
  );
  return response.data;
};
