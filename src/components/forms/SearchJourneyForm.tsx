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

const SearchJourneyForm = () => {
  const { setParams, resetParams } = useJourneysContext();
  const [journeyDate, setJourneyDate] = useState<Date | null>(null);

  const [selectedOrigin, setSelectedOrigin] = useState<any>(null);
  const [originQuery, setOriginQuery] = useState("");
  const [originResults, setOriginResults] = useState<any[]>([]);
  const debouncedOriginQuery = useDebounce(originQuery);

  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [destinationResults, setDestinationResults] = useState<any[]>([]);
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
      className="p-4 flex flex-col space-y-4 bg-gray-50 max-w-screen-sm md:max-w-md w-full rounded-md border-2"
    >
      <SearchAutocompleteInput
        label="Where is your departure?"
        items={originResults}
        selected={selectedOrigin}
        onQueryChange={setOriginQuery}
        onItemSelect={(item) => setSelectedOrigin(item)}
        placeholder="Enter origin (city, address, stops, etc.)"
      />

      <SearchAutocompleteInput
        label="Where would you like to go?"
        items={destinationResults}
        selected={selectedDestination}
        onQueryChange={setDestinationQuery}
        onItemSelect={(item) => setSelectedDestination(item)}
        placeholder="Enter destination (city, address, stops, etc.)"
      />

      <div>
        <label
          htmlFor="datetime"
          className="block text-sm font-medium text-gray-700"
        >
          When would you like to travel?
        </label>
        <DatePicker
          id="datetime"
          name="datetime"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          selected={journeyDate}
          onChange={(date: Date) => setJourneyDate(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select date and time for the journey"
        />
      </div>

      <div className="flex flex-row justify-end space-x-4">
        <Button
          disabled={!isSearchEnabled}
          onClick={() => onClearSearch()}
          variant="outline"
        >
          Clear Search
        </Button>

        <Button disabled={!isSearchEnabled} type="submit">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchJourneyForm;
