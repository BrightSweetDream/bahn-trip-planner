export interface IJourneyPrice {
  amount: number;
  currency: string;
}

export interface IJourneyLeg {}

export interface IJourney {
  type: string;
  price: IJourneyPrice;
  legs: IJourneyLeg;
}
