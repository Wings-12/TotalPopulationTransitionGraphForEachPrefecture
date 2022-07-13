import React, { useState, useEffect, useContext } from "react";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";

const CheckBox = ({ id, onChange, checked }) => {
  return (
    <input
      type="checkbox"
      id={id}
      onChange={onChange}
      checked={checked}
    ></input>
  );
};

const CheckBoxList = () => {
  const [prefecturesObj, setPrefecturesObj] = useState([]);
  let prefName = "";
  let prefCode = null;

  const { populationCompositionObj, setPopulationCompositionObj } = useContext(
    PopulationCompositionContext
  );

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

  const [checkedItems, setCheckedItems] = useState({});

  const sortInDescendingOrder = (prev) => {
    if (prev.result && prev.result.data) {
      prev.result.data.map((data) => {
        data.data.reverse();
      });
    }
  };

  const getPopulationComposition = () => {
    const path =
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
      prefCode;

    fetch(path, {
      headers: { "x-api-key": "NJgaOz1cA7SlWcx91WGP2DgUTJ8T7AQ3SIImDCBg" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("成功：" + prefName + "人口構成データ取得○");
        setPopulationCompositionObj(
          data.result.data.map((data) => {
            return data.data.reverse();
          })
        );
      })
      .catch((error) => {
        console.log("失敗：" + prefName + "人口構成データ取得✖");
      });
  };

  const handleChange = (event, eachResultPrefCode) => {
    if (event.target.checked === true) {
      prefCode = eachResultPrefCode;
      getPopulationComposition();

      setCheckedItems({
        [event.target.id]: event.target.checked,
      });
    }
  };

  return (
    <div>
      {prefecturesObj.result &&
        prefecturesObj.result.map(function (eachResult, i) {
          return (
            <label key={i}>
              {(prefName = eachResult.prefName)}
              <CheckBox
                id={i}
                onChange={(event) => {
                  handleChange(event, eachResult.prefCode);
                }}
                checked={checkedItems[i]}
              />
            </label>
          );
        })}
    </div>
  );
};

export default CheckBoxList;
