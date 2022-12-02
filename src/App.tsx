import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import JourneysContextProvider from "./context/JourneysContext";
import Main from "./Main";

const queryClient = new QueryClient();

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
