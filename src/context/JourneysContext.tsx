import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

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
  journeysLoading: boolean;
  resetParams: () => void;
  getEarlierJourneys: (earlierRef: string) => void;
  getLaterJourneys: (laterRef: string) => void;
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

export const JourneysContextProvider = ({ children }: JourneysContextProps) => {
  const [params, setParams] = useState<IJourneyParams>(DEFAULT_JOURNEY_PARAMS);

  const journeysQuery = useQuery(
    ["journeys-query", params],
    () => journeysApi.index(params).then((response) => response.data),
    { enabled: Boolean(params.from) && Boolean(params.to) }
  );

  const journeysLoading = useMemo(
    () => journeysQuery.isLoading && journeysQuery.isFetching,
    [journeysQuery.isFetching, journeysQuery.isLoading]
  );

  const resetParams = useCallback(() => setParams(DEFAULT_JOURNEY_PARAMS), []);

  const getEarlierJourneys = useCallback(
    (earlierRef: string) => {
      setParams({ from: params.from, to: params.to, earlierThan: earlierRef });
    },
    [params.from, params.to]
  );

  const getLaterJourneys = useCallback(
    (laterRef: string) => {
      setParams({ from: params.from, to: params.to, laterThan: laterRef });
    },
    [params.from, params.to]
  );

  return (
    <JourneysContext.Provider
      value={{
        params,
        setParams,
        journeysQuery,
        journeysLoading,
        resetParams,
        getEarlierJourneys,
        getLaterJourneys,
      }}
    >
      {children}
    </JourneysContext.Provider>
  );
};
