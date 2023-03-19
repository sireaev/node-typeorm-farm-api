import http from "http";

import config from "../config/config";

const API_URL = "http://api.positionstack.com/v1";

interface PositionStackObject {
  latitude: number;
  longitude: number;
  label: string;
  name: string;
  type: string;
  number: string;
  street: string;
  postal_code: string;
  confidence: number;
  region: string;
  region_code: string;
  administrative_area: string | null;
  neighbourhood: string;
  country: string;
  country_code: string;
  map_url: string;
}

interface PositionStackResult<T> {
  data: T[]
}

export const getCoordintesByAddress = async (address: string): Promise<PositionStackResult<PositionStackObject>> => {
  return new Promise((resolve, reject) => {
    return http.get(`${API_URL}/forward?access_key=${config.POSITIONSTACK_API_KEY}&query=${address}`, (resp) => {
        let data = "";
      
        resp.on("data", (chunk) => {
          data += chunk;
        });
      
        resp.on("end", () => {
          return resolve(JSON.parse(data) as PositionStackResult<PositionStackObject>);
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        return reject(err);
      });
  })
}
