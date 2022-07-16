import React, { useState, useEffect, useContext, Fragment } from "react";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";
import classes from "./CheckBoxList.module.scss";
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
  const { setPopulationCompositionObj } = useContext(
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
  const [checkedItem, setCheckedItem] = useState({});
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
        setPopulationCompositionObj(data);
      })
      .catch((error) => {
        console.log("失敗：" + prefName + "人口構成データ取得✖");
      });
  };
  const handleChange = (event, eachResultPrefCode) => {
    if (event.target.checked === true) {
      prefCode = eachResultPrefCode;
      getPopulationComposition();
      setCheckedItem({
        [event.target.id]: event.target.checked,
      });
    }
  };
  const sevenAreas = [
    "北海道東北",
    "関東",
    "中部",
    "近畿",
    "中国",
    "四国",
    "九州沖縄",
  ];
  const areaCodes = [8, 15, 24, 31, 36, 40];
  // areaCodesの意味：
  //   (※北海道東北エリアはエリア分けの条件分岐に不要のため除外)
  //   関東エリアの最初の県No.: 8
  //   中部エリアの最初の県No.: 15
  //   近畿エリアの最初の県No.: 24
  //   中国エリアの最初の県No.: 31
  //   四国エリアの最初の県No.: 36
  //   九州沖縄エリアの最初の県No.: 40
  // };

  return (
    <div>
      {sevenAreas.map((eachArea, index) => {
        return (
          <div key={index} className={classes.frame}>
            <label className={classes.sevenAreasTitle}>{eachArea}</label>
            <ul>
              {(() => {
                return (
                  prefecturesObj.result &&
                  prefecturesObj.result.map((eachResult, i) => {
                    prefName = eachResult.prefName;
                    prefCode = eachResult.prefCode;
                    const makeCheckBoxLi = (i, prefName, eachResult) => {
                      return (
                        <li key={i}>
                          <label>
                            {prefName}
                            <CheckBox
                              id={i}
                              onChange={(event) => {
                                handleChange(event, eachResult.prefCode);
                              }}
                              checked={checkedItem[i] || false}
                            />
                          </label>
                        </li>
                      );
                    };
                    for (
                      let index = 1;
                      index < sevenAreas.length - 1;
                      index++
                    ) {
                      if (
                        eachArea == sevenAreas[0] &&
                        prefCode < areaCodes[0]
                      ) {
                        return makeCheckBoxLi(i, prefName, eachResult);
                      } else if (
                        eachArea === sevenAreas[6] &&
                        areaCodes[5] <= prefCode
                      ) {
                        return makeCheckBoxLi(i, prefName, eachResult);
                      } else if (
                        eachArea === sevenAreas[index] &&
                        areaCodes[index - 1] <= prefCode &&
                        prefCode < areaCodes[index]
                      ) {
                        return makeCheckBoxLi(i, prefName, eachResult);
                      }
                    }
                  })
                );
              })()}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
export default CheckBoxList;
