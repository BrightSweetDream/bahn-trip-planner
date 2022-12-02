import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchJourneyForm from "./components/forms/SearchJourneyForm";
import JourneyList from "./components/JourneyList";
import JourneysContextProvider from "./context/JourneysContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JourneysContextProvider>
        <div className="flex flex-col space-y-4 space-x-0 items-center md:flex-row justify-center md:items-start md:space-x-4 md:space-y-0 p-6">
          <SearchJourneyForm />
          <JourneyList />
        </div>
      </JourneysContextProvider>
    </QueryClientProvider>
  );
}

export default App;
