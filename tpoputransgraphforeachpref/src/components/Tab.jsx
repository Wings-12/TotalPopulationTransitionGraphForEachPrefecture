import { useState, useContext } from "react";
import classes from "./Tab.module.scss";
import PopulationCompositionTable from "./PopulationCompositionTable";
import LineGraph from "./LineGraph";
import { GraphDataContext } from "./providers/GraphDataProvider";
import { PopuComposContext } from "./providers/PopuComposProvider";

function Tab() {
  const [toggleState, setToggleState] = useState(1);

  const { graphData, setGraphData } = useContext(GraphDataContext);

  const { populationCompositionObj, setPopulationCompositionObj } =
    useContext(PopuComposContext);

  const toggleTab = (index) => {
    setToggleState(index);

    // チェックボックスにチェックが入ったら、グラフを表示させるようにしないと、X軸にautoなど、ユーザーがわからない情報が表示されてしまう。
    // → チェックボックスにチェックがが入ったら、グラフを表示させるように作る。
    // バグあり。
    // 内容：
    // 1. 一番最初のデータが（グラフクリックに紐づけると、クリックした状態の時に）更新されない　←チェックボックスリストでgetPopulationCompositionを呼ぶときにthenでdataを取ってきて、そのデータでgraphDataを設定すれば良い？
    // 2. データが足りない
    // 3. 表を表示した後に2回目チェックボックスにチェックを入れると、データが降順ソートされない
    setGraphData([
      {
        labels: populationCompositionObj.result.data[0].data[0].year,
        総人口人数: populationCompositionObj.result.data[0].data[0].value,
      },
      {
        labels: populationCompositionObj.result.data[0].data[1].year,
        総人口人数: populationCompositionObj.result.data[0].data[1].value,
      },
    ]);
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
              ? `${classes.content} ${classes.active_content}`
              : `${classes.content}`
          }`}
        >
          <PopulationCompositionTable></PopulationCompositionTable>
          <hr />
        </div>

        <div
          className={`${
            toggleState === 2
              ? `${classes.content} ${classes.active_content}`
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
