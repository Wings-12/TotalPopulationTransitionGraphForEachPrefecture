import { Fragment } from "react";
import Header from "./components/Header";
import CheckBoxList from "./components/CheckBoxList";
import { PopuComposProvider } from "./components/providers/PopuComposProvider";
import Tab from "./components/Tab";
import { GraphDataProvider } from "./components/providers/GraphDataProvider";

export const App = () => {
  return (
    <Fragment>
      <Header></Header>
      <PopuComposProvider>
        <GraphDataProvider>
          <CheckBoxList></CheckBoxList>
          <Tab></Tab>
        </GraphDataProvider>
      </PopuComposProvider>
    </Fragment>
  );
};
