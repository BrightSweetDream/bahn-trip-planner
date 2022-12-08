import React from "react";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { useJourneysContext } from "../context/JourneysContext";
import { getCurrencySymbol } from "../helpers/currency";

const JourneyList = () => {
  const {
    showBtn,
    journeysQuery,
    journeysLoading,
    getEarlierJourneys,
    getLaterJourneys,
    getOriginJourney,
  } = useJourneysContext();

  //console.log("Journey List", journeysQuery.data?.journeys);

  return (
    <div className="flex flex-col space-y-4 w-full pt-6">
      {!journeysLoading &&
        journeysQuery.data &&
        journeysQuery.data.journeys.length > 0 && (
          <div className="w-full flex flex-col space-y-6">
            <div className="flex flex-row justify-between">
              <div
                role="button"
                onClick={() =>
                  getEarlierJourneys(journeysQuery.data.earlierRef)
                }
                className="flex flex-row space-x-2 hover:underline hover:cursor-pointer"
              >
                <ChevronLeftIcon className="h-6 w-6" /> <span>Earlier</span>
              </div>

              {
                <div
                  role="button"
                  onClick={() => getOriginJourney()}
                  className="flex flex-row space-x-2 hover:underline hover:cursor-pointer"
                  id="Origin"
                >
                  <span>{showBtn ? "Origin Search" : ""}</span>
                </div>
              }
              <div
                role="button"
                onClick={() => getLaterJourneys(journeysQuery.data.laterRef)}
                className="flex flex-row space-x-2 hover:underline hover:cursor-pointer"
              >
                <span>Later</span> <ChevronRightIcon className="h-6 w-6" />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              {journeysQuery.data.journeys.map((journey, index: number) => (
                <details
                  key={`journey-${index}`}
                  className="w-full flex flex-col space-y-4 bg-white p-4 rounded-md shadow"
                >
                  <summary className="text-lg cursor-pointer">
                    {format(
                      new Date(journey.legs[0].departure),
                      "MM/dd/yyyy - HH:mm"
                    )}{" "}
                    -{" "}
                    {format(
                      new Date(journey.legs[journey.legs.length - 1].arrival),
                      "MM/dd/yyyy - HH:mm"
                    )}
                    <div>
                      {journey.legs.length} Stops,&nbsp; Price:{" "}
                      {journey.price
                        ? `${journey.price.amount} ${getCurrencySymbol(
                            journey.price.currency
                          )}`
                        : "Unknown"}
                    </div>
                  </summary>

                  <div className="flex flex-col space-y-2">
                    {journey.legs.map((journeyLeg) => (
                      <div key={journeyLeg.tripId} className="rounded-md">
                        <div className="bg-white p-4 border-t-2 grid grid-cols-3 gap-4 justify-center">
                          <div className="flex flex-col justify-center items-center">
                            <h3 className="text-md">
                              {format(
                                new Date(journeyLeg.departure),
                                "MM/dd/yyyy - HH:mm"
                              )}
                            </h3>
                            <h3 className="text-lg font-semibold">
                              {journeyLeg.origin.name}&nbsp;
                            </h3>
                          </div>
                          <div className="flex justify-center items-center w-full">
                            <hr className="my-8 w-64 h-1 bg-gray-300 rounded border-0 dark:bg-gray-700" />
                            <div className="flex flex-col">
                              <hr className="translate-y-1.5 -rotate-45 w-4 h-1 bg-gray-300 rounded border-0 dark:bg-gray-700" />
                              <hr className="-translate-y-1.5 rotate-45 w-4 h-1 bg-gray-300 rounded border-0 dark:bg-gray-700" />
                            </div>
                            <div className="absolute bg-white -translate-x-1/5 dark:bg-gray-900 text-xl">
                              {Math.floor(
                                (new Date(journeyLeg.arrival).getTime() -
                                  new Date(journeyLeg.departure).getTime()) /
                                  3600000
                              )
                                ? `${Math.floor(
                                    (new Date(journeyLeg.arrival).getTime() -
                                      new Date(
                                        journeyLeg.departure
                                      ).getTime()) /
                                      3600000
                                  )}h ${Math.ceil(
                                    ((new Date(journeyLeg.arrival).getTime() -
                                      new Date(
                                        journeyLeg.departure
                                      ).getTime()) %
                                      3600000) /
                                      60000
                                  )}m`
                                : `${Math.ceil(
                                    ((new Date(journeyLeg.arrival).getTime() -
                                      new Date(
                                        journeyLeg.departure
                                      ).getTime()) %
                                      3600000) /
                                      60000
                                  )}min`}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <h3 className="text-md">
                              {format(
                                new Date(journeyLeg.arrival),
                                "MM/dd/yyyy - HH:mm"
                              )}
                            </h3>
                            <h3 className="text-lg text-center font-semibold">
                              {journeyLeg.destination.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

      {!journeysLoading &&
        journeysQuery.data &&
        journeysQuery.data.journeys.length === 0 && (
          <div className="text-center py-16">No journey found.</div>
        )}
    </div>
  );
};

export default JourneyList;
