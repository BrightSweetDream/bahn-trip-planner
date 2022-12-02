import client from "../axios";

const search = (params: Record<string, any>) =>
  client.get("/locations", { params });

const locations = {
  search,
};

export default locations;
