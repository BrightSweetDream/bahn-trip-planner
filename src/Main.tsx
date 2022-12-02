import React from "react";

import SearchJourneyForm from "./components/forms/SearchJourneyForm";
import JourneyList from "./components/JourneyList";

const Main = () => {
  return (
    <div className="flex flex-col space-y-4 space-x-0 items-center md:flex-row justify-center md:items-start md:space-x-4 md:space-y-0 p-6 ">
      <SearchJourneyForm />
      <JourneyList />
    </div>
  );
};

export default Main;
