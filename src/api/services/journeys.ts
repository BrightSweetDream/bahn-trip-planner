import client from "../axios";

const index = (params: Record<string, any>) =>
  client.get("/journeys", { params });

const journeys = {
  index,
};

export default journeys;
