import { IJourney } from "./journey";

export interface IJourneysResponse {
  earlierRef: string;
  journeys: IJourney;
  laterRef: string;
  realtimeDataFrom: number;
}
