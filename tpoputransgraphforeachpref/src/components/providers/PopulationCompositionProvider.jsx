import { createContext, useState } from "react";

export const PopulationCompositionContext = createContext({});

export const PopulationCompositionProvider = (props) => {
  const { children } = props;

  const [populationCompositionObj, setPopulationCompositionObj] = useState({});

  return (
    <PopulationCompositionContext.Provider
      value={{ populationCompositionObj, setPopulationCompositionObj }}
    >
      {children}
    </PopulationCompositionContext.Provider>
  );
};
