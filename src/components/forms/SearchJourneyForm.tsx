import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import debounce from "lodash.debounce";
import DatePicker from "react-datepicker";

import { locationsApi } from "../../api";
import SearchAutocompleteInput from "../shared/SearchAutocompleteInput";
import { useJourneysContext } from "../../context/JourneysContext";

const fetchLocations = async (query: string, callback: any) => {
  const response = await locationsApi.search({ query });
  callback(response.data);
};
const debouncedFetchLocations = debounce((query, callback) => {
  fetchLocations(query, callback);
}, 500);

const SearchJourneyForm = () => {
  const { setParams } = useJourneysContext();
  const [startDate, setStartDate] = useState<Date | null>(null);

  const [selectedOrigin, setSelectedOrigin] = useState<any>(null);
  const [originQuery, setOriginQuery] = useState("");
  const [originResults, setOriginResults] = useState<any[]>([]);

  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [destinationResults, setDestinationResults] = useState<any[]>([]);

  useEffect(() => {
    if (destinationQuery) {
      debouncedFetchLocations(destinationQuery, (res: any) => {
        setDestinationResults(res);
      });
    } else {
      setDestinationResults([]);
    }

    if (originQuery) {
      debouncedFetchLocations(originQuery, (res: any) => {
        setOriginResults(res);
      });
    } else {
      setOriginResults([]);
    }
  }, [destinationQuery, originQuery]);

  const isSearchEnabled = useMemo(
    () =>
      Boolean(selectedDestination) &&
      Boolean(selectedOrigin) &&
      Boolean(startDate),
    [selectedDestination, selectedOrigin, startDate]
  );

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (!selectedDestination || !selectedOrigin || !startDate) {
        return;
      }

      setParams({
        from: selectedOrigin.id,
        to: selectedDestination.id,
        departure: startDate,
      });
    },
    [selectedDestination, selectedOrigin, setParams, startDate]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 flex flex-col space-y-4 bg-gray-50 max-w-screen-sm md:max-w-md w-full rounded-md border-2"
    >
      <div>
        <label
          htmlFor="origin"
          className="block text-sm font-medium text-gray-700"
        >
          Origin
        </label>
        <SearchAutocompleteInput
          items={originResults}
          selected={selectedOrigin}
          onQueryChange={setOriginQuery}
          onItemSelect={(item) => setSelectedOrigin(item)}
        />
      </div>

      <div>
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-gray-700"
        >
          Destination
        </label>
        <SearchAutocompleteInput
          items={destinationResults}
          selected={selectedDestination}
          onQueryChange={setDestinationQuery}
          onItemSelect={(item) => setSelectedDestination(item)}
        />
      </div>

      <div>
        <label
          htmlFor="datetime"
          className="block text-sm font-medium text-gray-700"
        >
          Date & Time
        </label>
        <DatePicker
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showTimeSelect
        />
      </div>

      <div className="text-right">
        <button
          disabled={!isSearchEnabled}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchJourneyForm;
