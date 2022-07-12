import React, { useState, useEffect, useContext } from "react";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";

// 作りたい処理：常に最後にチェックボックスにチェックを入れ、それ以外のチェックを外す

/*
処理フロー：
・onChangeでチェックボックスの状態が変わることを検知
・チェックがついたら、前にチェックがついていたチェックボックスのチェックを外す
*/

const CheckBox = (props) => {
  const { populationCompositionObj, setPopulationCompositionObj } = useContext(
    PopulationCompositionContext
  );
  const prefName = props.eachResult && props.eachResult.prefName;
  const prefCode = props.eachResult && props.eachResult.prefCode;

  const handleChange = (event) => {
    if (event.target.checked === true) {
      const path =
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
        prefCode;

      fetch(path, {
        headers: { "x-api-key": "NJgaOz1cA7SlWcx91WGP2DgUTJ8T7AQ3SIImDCBg" },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("成功：" + prefName + "人口構成データ取得○");
          setPopulationCompositionObj(data);
        })
        .catch((error) => {
          console.log("失敗：" + prefName + "人口構成データ取得✖");
        });
    }
  };

  return (
    <div>
      <label>{prefName}</label>
      <input type="checkbox" onChange={handleChange}></input>
    </div>
  );
};

const CheckBoxList = () => {
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
    <div>
      {prefecturesObj.result &&
        prefecturesObj.result.map(function (eachResult, i) {
          return <CheckBox key={i} eachResult={eachResult}></CheckBox>;
        })}
    </div>
  );
};

export default CheckBoxList;
