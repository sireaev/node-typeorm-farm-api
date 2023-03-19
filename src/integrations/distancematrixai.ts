import http from "http";
import config from "config/config";

const API_URL  = "http://api.distancematrix.ai/maps/api/distancematrix/json";

interface SelectItem {
    text: string;
    value: number;
}

interface DistanceObject {
    distance: SelectItem,
    duration: SelectItem,
    duration_in_traffic: SelectItem,
    status: string;
}

interface DistanceRowObject {
    elements: DistanceObject[]
}

interface DistanceResult {
    destination_addresses: string[],
    origin_addresses: string[],
    rows: DistanceRowObject[]
}

export const getDrivingDistance = async (coordinates: { 
    from: { lat: number, long: number}, 
    to: { lat: number, long: number }}): Promise<SelectItem> => {

  return new Promise((resolve, reject) => {
    return http.get(`${API_URL}`+
        `?key=${config.DISTANCE_MATRIX_AI_API_KEY}`+
        `&origins=${coordinates.from.lat},${coordinates.from.long}`+
        `&destinations=${coordinates.to.lat},${coordinates.to.long}`+
        `&departure_time=now`, (resp) => {

        let data = "";
      
        resp.on("data", (chunk) => {
          data += chunk;
        });
      
        resp.on("end", () => {

          const result = (JSON.parse(data) as DistanceResult).rows[0].elements[0];

          return resolve(result.distance || result.duration_in_traffic);
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        return reject(err);
      });
  })
}
