import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { IJourneysResponse } from "../@types/api";
import { IJourneysParams } from "../@types/journey";
import { journeysApi } from "../api";

interface IJourneysContext {
  params: IJourneysParams;
  showBtn: number;
  setShowBtn: (showBtn: number) => void;
  setParams: (params: IJourneysParams) => void;
  journeysQuery: UseQueryResult<IJourneysResponse>;
  journeysLoading: boolean;
  resetParams: () => void;
  getEarlierJourneys: (earlierRef: string) => void;
  getLaterJourneys: (laterRef: string) => void;
  getOriginJourney: () => void;
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
  const [params, setParams] = useState<IJourneysParams>(DEFAULT_JOURNEY_PARAMS);
  const [showBtn, setShowBtn] = useState<number>(0);

  const journeysQuery = useQuery(
    ["journeys-query", params],
    () => journeysApi.index(params).then((response) => response.data),
    { enabled: Boolean(params.from) && Boolean(params.to) }
  );

  //console.log(journeysQuery.data);

  const journeysLoading = useMemo(
    () => journeysQuery.isLoading && journeysQuery.isFetching,
    [journeysQuery.isFetching, journeysQuery.isLoading]
  );

  const resetParams = useCallback(() => setParams(DEFAULT_JOURNEY_PARAMS), []);

  const getEarlierJourneys = useCallback(
    (earlierRef: string) => {
      setParams({ from: params.from, to: params.to, earlierThan: earlierRef });
      setShowBtn(showBtn - 1);
    },
    [params.from, params.to, showBtn]
  );
  const getLaterJourneys = useCallback(
    (laterRef: string) => {
      setParams({ from: params.from, to: params.to, laterThan: laterRef });

      setShowBtn(showBtn + 1);
    },
    [params.from, params.to, showBtn]
  );

  const getOriginJourney = useCallback(() => {
    setParams({
      from: params.from,
      to: params.to,
      departure: params.departure,
    });
    setShowBtn(0);
  }, [params.from, params.to, showBtn]);

  console.log(showBtn);

  return (
    <JourneysContext.Provider
      value={{
        params,
        showBtn,
        setShowBtn,
        setParams,
        journeysQuery,
        journeysLoading,
        resetParams,
        getEarlierJourneys,
        getLaterJourneys,
        getOriginJourney,
      }}
    >
      {children}
    </JourneysContext.Provider>
  );
};
