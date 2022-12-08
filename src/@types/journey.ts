import { ILocation } from "./location";

export interface IJourneyPrice {
  amount: number;
  currency: string;
}

export interface IJourneyLeg {
  tripId: string;
  departure: string;
  arrival: string;
  origin: ILocation;
  destination: ILocation;
  departurePlatform: string;
  arrivalPlatform: string;
}

export interface IJourney {
  type: string;
  price: IJourneyPrice;
  legs: IJourneyLeg[];
}

export interface IJourneysParams {
  from: string;
  to: string;
  departure?: Date;
  arrival?: Date;
  earlierThan?: string;
  laterThan?: string;
}
