import axios from "axios";

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
