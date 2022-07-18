import { createContext, useState } from "react";

export const PopuComposContext = createContext({});

export const PopuComposProvider = (props) => {
  const { children } = props;

  const [populationCompositionObj, setPopulationCompositionObj] = useState({});

  return (
    <PopuComposContext.Provider
      value={{ populationCompositionObj, setPopulationCompositionObj }}
    >
      {children}
    </PopuComposContext.Provider>
  );
};
