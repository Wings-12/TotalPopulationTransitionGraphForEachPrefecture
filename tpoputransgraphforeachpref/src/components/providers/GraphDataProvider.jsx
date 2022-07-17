import { createContext, useState } from "react";

export const GraphDataContext = createContext({});

export const GraphDataProvider = (props) => {
  const { children } = props;

  const [graphData, setGraphData] = useState({});

  return (
    <GraphDataContext.Provider value={{ graphData, setGraphData }}>
      {children}
    </GraphDataContext.Provider>
  );
};
