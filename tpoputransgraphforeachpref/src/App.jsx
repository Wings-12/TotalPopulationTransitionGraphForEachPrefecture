import { Fragment } from "react";
import Header from "./components/Header";
import CheckBoxList from "./components/CheckBoxList";
import { PopulationCompositionProvider } from "./components/providers/PopulationCompositionProvider";
import Tab from "./components/Tab";
import { GraphDataProvider } from "./components/providers/GraphDataProvider";

export const App = () => {
  return (
    <Fragment>
      <Header></Header>
      <PopulationCompositionProvider>
        <GraphDataProvider>
          <CheckBoxList></CheckBoxList>
          <Tab></Tab>
        </GraphDataProvider>
      </PopulationCompositionProvider>
    </Fragment>
  );
};
