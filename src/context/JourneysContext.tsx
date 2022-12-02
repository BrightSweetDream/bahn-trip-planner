import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

import { journeysApi } from "../api";

interface IJourneyParams {
  from: string;
  to: string;
  [key: string]: string | Date;
}

interface IJourneysContext {
  params: IJourneyParams;
  setParams: (params: IJourneyParams) => void;
  journeysQuery: UseQueryResult<any>;
}

const JourneysContext = createContext<IJourneysContext>({} as IJourneysContext);

type JourneysContextProps = {
  children: React.ReactNode;
};

export const useJourneysContext = () => useContext(JourneysContext);

const DEFAULT_JOURNEY_PARAMS = {
  from: "",
  to: "",
};

const JourneysContextProvider = ({ children }: JourneysContextProps) => {
  const [params, setParams] = useState<IJourneyParams>(DEFAULT_JOURNEY_PARAMS);

  const journeysQuery = useQuery(
    ["journeys-query", params],
    () => journeysApi.index(params).then((response) => response.data),
    { enabled: Boolean(params.from) && Boolean(params.to) }
  );

  return (
    <JourneysContext.Provider value={{ params, setParams, journeysQuery }}>
      {children}
    </JourneysContext.Provider>
  );
};

export default JourneysContextProvider;
