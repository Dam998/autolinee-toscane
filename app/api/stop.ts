import dayjs from "dayjs";
import it from "dayjs/locale/it";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "axios";

dayjs.locale(it);
dayjs.extend(utc);
dayjs.extend(timezone);

interface IStopTimes {
  infos?: {
    results_date_time: string;
  };
  items?: {
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

export const getStopTimes = async (stop: string): Promise<IStopTimes> => {
  const currentDate = dayjs().tz("Europe/Rome");
  const response = await axios.get("/it/pthv/get/stop-stoptimes-discovery", {
    baseURL: process.env.AT_BASENAME,
    params: {
      nbtimes: 2,
      stop,
      reseau: "",
      date: currentDate.format("YYYY-MM-DD"),
      heure: currentDate.format("HH:mm:ss"),
      nbpasttimes: 0,
      pastsince: 480,
    },
  });
  return response.data;
};

export interface IRouteInfo {
  timestamp?: string;
  directions?: {
    direction: string;
    display: string;
    stopPoints?: {
      id: string;
      type: string;
      name: string;
    }[];
  }[];
}

export const getRouteInfo = async (
  routeId: string
): Promise<IRouteInfo | undefined> => {
  try {
    const response = await axios.get(
      `/InstantCore/v3/networks/97/lines/AUTOLINEE:${routeId}/directions?stopPoints=false`,
      {
        baseURL: process.env.AT_MOBILE_BASENAME,
      }
    );
    return response.data;
  } catch (error) {
    // IGNORE
    console.log(error);
  }

  return undefined;
};

interface IStop {
  stopAreas?: {
    stopArea: {
      id: string;
      name: string;
      city: string;
      modes: string[];
    };
    lines: {
      line: {
        sName: string;
      };
      directions: {
        times: {
          destinationDisplay: string;
          departureWait: number;
          realTime: 0 | 1;
        }[];
      }[];
    }[];
  }[];
}

export const getStops = async (stop: string): Promise<IStop> => {
  const response = await axios.get(
    `/InstantCore/v3/networks/97/stopAreas/AUTOLINEE:${stop}/schedules`,
    {
      baseURL: process.env.AT_MOBILE_BASENAME,
    }
  );
  return response.data;
};
