import React from "react";

import SearchJourneyForm from "./components/forms/SearchJourneyForm";
import JourneyList from "./components/JourneyList";

const Main = () => {
  return (
    <div>
      <div className="flex flex-col justify-around items-center space-y-0 p-6">
        <SearchJourneyForm />
        <JourneyList />
      </div>
    </div>
  );
};

export default Main;
