import React from "react";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { useJourneysContext } from "../context/JourneysContext";
import { getCurrencySymbol } from "../helpers/currency";
import SkeletonBox from "./shared/SkeletonBox";

const JourneyList = () => {
  const {
    journeysQuery,
    journeysLoading,
    getEarlierJourneys,
    getLaterJourneys,
  } = useJourneysContext();

  return (
    <div className="flex flex-col max-w-screen-sm space-y-4 w-full">
      {journeysLoading &&
        [1, 2, 3].map((item) => (
          <SkeletonBox key={item} className="w-full h-32" />
        ))}

      {!journeysLoading && !journeysQuery.data && (
        <div className="text-center py-16">
          Enter your details to see available journeys.
        </div>
      )}

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
                <div
                  key={`journey-${index}`}
                  className="w-full flex flex-col space-y-4 bg-green-300 p-4 rounded-md"
                >
                  <h2 className="text-xl font-semibold">
                    {journey.price
                      ? `${journey.price.amount} ${getCurrencySymbol(
                          journey.price.currency
                        )}`
                      : "Price Unknown"}
                  </h2>

                  <div className="flex flex-col space-y-2">
                    {journey.legs.map((journeyLeg) => (
                      <div
                        key={journeyLeg.tripId}
                        className="bg-gray-50 rounded-md p-4 flex flex-row items-center justify-between"
                      >
                        <div>
                          <h3 className="text-sm">
                            {format(
                              new Date(journeyLeg.departure),
                              "MM/dd/yyyy - HH:mm"
                            )}
                          </h3>
                          <h3 className="text-lg font-semibold">
                            {journeyLeg.origin.name}
                          </h3>
                        </div>

                        <div className="text-right">
                          <h3 className="text-sm">
                            {format(
                              new Date(journeyLeg.arrival),
                              "MM/dd/yyyy - HH:mm"
                            )}
                          </h3>
                          <h3 className="text-lg font-semibold">
                            {journeyLeg.destination.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
