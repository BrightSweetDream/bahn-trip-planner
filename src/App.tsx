import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import JourneysContextProvider from "./context/JourneysContext";
import Main from "./Main";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JourneysContextProvider>
        <Main />
      </JourneysContextProvider>
    </QueryClientProvider>
  );
}

export default App;
