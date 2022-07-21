import { useState, useContext } from "react";
import classes from "./Tab.module.scss";
import PopulationCompositionTable from "./PopulationCompositionTable";
import LineGraph from "./LineGraph";
import { PopuComposContext } from "./providers/PopuComposProvider";

function Tab() {
  const [toggleState, setToggleState] = useState(1);

  const { populationCompositionObj, setPopulationCompositionObj } =
    useContext(PopuComposContext);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className={classes.container}>
      <div className={classes.bloc_tabs}>
        <button
          className={`${
            toggleState === 1
              ? `${classes.tabs} ${classes.active_tabs}`
              : `${classes.tabs}`
          }`}
          onClick={() => toggleTab(1)}
        >
          表
        </button>
        <button
          className={`${
            toggleState === 2
              ? `${classes.tabs} ${classes.active_tabs}`
              : `${classes.tabs}`
          }`}
          onClick={() => toggleTab(2)}
        >
          グラフ
        </button>
      </div>

      <div className={classes.content_tabs}>
        <div
          className={`${
            toggleState === 1
              ? `${classes.content} ${classes.active_content} ${classes.table}`
              : `${classes.content}`
          }`}
        >
          <PopulationCompositionTable></PopulationCompositionTable>
          <hr />
        </div>

        <div
          className={`${
            toggleState === 2
              ? `${classes.content} ${classes.active_content} ${classes.line_graph}`
              : `${classes.content}`
          }`}
        >
          <LineGraph></LineGraph>
        </div>
      </div>
    </div>
  );
}

export default Tab;
