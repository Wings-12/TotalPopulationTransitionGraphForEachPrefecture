import { Fragment } from "react";
import CheckBoxList from "./components/CheckBoxList";
import PopulationCompositionTable from "./components/PopulationCompositionTable";
import { PopulationCompositionProvider } from "./components/providers/PopulationCompositionProvider";

export const App = () => {
  return (
    <Fragment>
      <PopulationCompositionProvider>
        <CheckBoxList></CheckBoxList>
        <PopulationCompositionTable></PopulationCompositionTable>
      </PopulationCompositionProvider>
    </Fragment>
  );
};
