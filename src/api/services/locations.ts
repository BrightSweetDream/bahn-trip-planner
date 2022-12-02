import { ILocation } from "../../@types/location";
import client from "../axios";

const search = (params: Record<string, any>) =>
  client.get<ILocation[]>("/locations", { params });

const locations = {
  search,
};

export default locations;
