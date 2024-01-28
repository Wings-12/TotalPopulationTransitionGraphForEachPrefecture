import { Fragment } from "react";
import CheckBoxList from "./components/CheckBoxList";
import LanguageSwitcher from "./components/LanguageSwitcher";
import PopulationCompositionTable from "./components/PopulationCompositionTable";
import { PopulationCompositionProvider } from "./components/providers/PopulationCompositionProvider";
import "./i18n.js";

export const App = () => {
  return (
    <Fragment>
      <LanguageSwitcher></LanguageSwitcher>
      <PopulationCompositionProvider>
        <CheckBoxList></CheckBoxList>
        <PopulationCompositionTable></PopulationCompositionTable>
      </PopulationCompositionProvider>
    </Fragment>
  );
};
