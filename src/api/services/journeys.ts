import { IJourneysResponse } from "../../@types/api";
import client from "../axios";

const index = (params: Record<string, any>) =>
  client.get<IJourneysResponse>("/journeys", { params });

const journeys = {
  index,
};

export default journeys;
