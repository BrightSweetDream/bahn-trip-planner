import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import DatePicker from "react-datepicker";

import { locationsApi } from "../../api";
import SearchAutocompleteInput from "../shared/SearchAutocompleteInput";
import { useJourneysContext } from "../../context/JourneysContext";
import Button from "../shared/Button";
import useDebounce from "../../hooks/use-debounce";
import { ILocation } from "../../@types/location";

const SearchJourneyForm = () => {
  const { setParams, resetParams, journeysLoading, journeysQuery } =
    useJourneysContext();
  const [journeyDate, setJourneyDate] = useState<Date | null>(null);

  const [selectedOrigin, setSelectedOrigin] = useState<ILocation | null>(null);
  const [originQuery, setOriginQuery] = useState("");
  const [originResults, setOriginResults] = useState<ILocation[]>([]);
  const debouncedOriginQuery = useDebounce(originQuery);

  const [selectedDestination, setSelectedDestination] =
    useState<ILocation | null>(null);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [destinationResults, setDestinationResults] = useState<ILocation[]>([]);
  const debouncedDestinationQuery = useDebounce(destinationQuery);

  const fetchLocations = useCallback(async (query: string) => {
    const response = await locationsApi.search({ query });
    return response.data;
  }, []);

  useEffect(() => {
    if (debouncedOriginQuery) {
      fetchLocations(debouncedOriginQuery).then((data) =>
        setOriginResults(data)
      );
    } else {
      setOriginResults([]);
    }

    if (debouncedDestinationQuery) {
      fetchLocations(debouncedDestinationQuery).then((data) =>
        setDestinationResults(data)
      );
    } else {
      setDestinationResults([]);
    }
  }, [debouncedDestinationQuery, debouncedOriginQuery, fetchLocations]);

  const isSearchEnabled = useMemo(
    () =>
      Boolean(selectedDestination) &&
      Boolean(selectedOrigin) &&
      Boolean(journeyDate),
    [selectedDestination, selectedOrigin, journeyDate]
  );

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (!selectedDestination || !selectedOrigin || !journeyDate) {
        return;
      }

      setParams({
        from: selectedOrigin.id,
        to: selectedDestination.id,
        departure: journeyDate,
      });
    },
    [selectedDestination, selectedOrigin, setParams, journeyDate]
  );

  const onClearSearch = useCallback(() => {
    setSelectedDestination(null);
    setSelectedOrigin(null);
    setJourneyDate(null);
    resetParams();
  }, [resetParams]);

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className="p-5 flex flex-col space-y-6 bg-white w-full rounded-md border-1 mx-2 shadow-md"
    >
      <div className="text-center text-2xl">Trip Planner</div>

      <fieldset className="flex flex-col space-y-4" disabled={journeysLoading}>
        <div className="flex flex-row justify-around">
          <div className="mt-1 basis-1/4">
            <label
              htmlFor="datetime"
              className="block text-sm font-medium text-gray-700"
            >
              Date and Time
            </label>
            <DatePicker
              id="datetime"
              name="datetime"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              selected={journeyDate}
              onChange={(date: Date) => setJourneyDate(date)}
              showTimeSelect
              dateFormat="MM/dd/yyyy - HH:mm"
              timeFormat="HH:mm"
              placeholderText="Select date and time for the journey"
              disabled={journeysLoading}
            />
          </div>
          <SearchAutocompleteInput
            label="From"
            items={originResults}
            selected={selectedOrigin}
            onQueryChange={setOriginQuery}
            onItemSelect={(item) => setSelectedOrigin(item)}
            placeholder="Enter origin (city, address, stops, etc.)"
          />
          <SearchAutocompleteInput
            label="To"
            items={destinationResults}
            selected={selectedDestination}
            onQueryChange={setDestinationQuery}
            onItemSelect={(item) => setSelectedDestination(item)}
            placeholder="Enter destination (city, address, stops, etc.)"
          />
          <div className="flex flex-row items-end">
            <Button
              disabled={!isSearchEnabled || journeysLoading}
              loading={journeysLoading}
              type="submit"
            >
              Search
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default SearchJourneyForm;
