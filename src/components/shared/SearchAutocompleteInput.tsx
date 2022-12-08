import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

type AutocompleteItem = {
  id: string;
  name: string;
};

type SearchAutocompleteInputProps = {
  items: AutocompleteItem[];
  selected: any;
  onQueryChange: (query: string) => void;
  onItemSelect: (item: any) => void;
  label?: string;
  placeholder?: string;
};

const SearchAutocompleteInput = ({
  label = "",
  items,
  selected,
  onQueryChange,
  onItemSelect,
  placeholder = "",
}: SearchAutocompleteInputProps) => {
  return (
    <Combobox value={selected} onChange={onItemSelect}>
      <div className="relative mt-1 basis-1/4">
        {label && (
          <Combobox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Combobox.Label>
        )}
        <Combobox.Input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          displayValue={(person: any) => person?.name}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
        />
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => onQueryChange("")}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              items.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>

                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-blue-500"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default SearchAutocompleteInput;
