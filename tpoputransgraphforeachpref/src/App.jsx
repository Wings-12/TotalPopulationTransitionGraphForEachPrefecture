import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import CheckBox from "./components/CheckBox";
import PopulationCompositionTable from "./components/PopulationCompositionTable";
import { PopulationCompositionProvider } from "./components/providers/PopulationCompositionProvider";

export const App = () => {
  const [prefecturesObj, setPrefecturesObj] = useState([]);

  useEffect(() => {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: { "x-api-key": "NJgaOz1cA7SlWcx91WGP2DgUTJ8T7AQ3SIImDCBg" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("成功：都道府県一覧データ取得○");
        setPrefecturesObj(data);
      })
      .catch((error) => {
        console.log("失敗：都道府県一覧データ取得✖");
      });
  }, []);

  return (
    <Fragment>
      <PopulationCompositionProvider>
        {prefecturesObj.result &&
          prefecturesObj.result.map(function (eachResult, i) {
            return <CheckBox key={i} eachResult={eachResult}></CheckBox>;
          })}
        <PopulationCompositionTable></PopulationCompositionTable>
      </PopulationCompositionProvider>
    </Fragment>
  );
};
