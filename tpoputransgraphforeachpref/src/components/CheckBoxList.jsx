import React, { useState, useEffect, useContext } from "react";
import { PopuComposContext } from "./providers/PopuComposProvider";
import classes from "./CheckBoxList.module.scss";
import { GraphDataContext } from "./providers/GraphDataProvider";

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
  const { populationCompositionObj, setPopulationCompositionObj } =
    useContext(PopuComposContext);

  const GetPrefecturesObj = async () => {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: { "x-api-key": process.env.REACT_APP_API_KEY },
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
  };

  useEffect(() => {
    GetPrefecturesObj();
  }, []);

  const [checkedItem, setCheckedItem] = useState({});

  const { graphData, setGraphData } = useContext(GraphDataContext);

  const getPopulationComposition = async () => {
    try {
      const path =
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
        prefCode;
      const res = await fetch(path, {
        headers: { "x-api-key": "NJgaOz1cA7SlWcx91WGP2DgUTJ8T7AQ3SIImDCBg" },
      });

      const data = await res.json();

      // console.log("成功：" + prefName + "人口構成データ取得○");
      setPopulationCompositionObj(data);

      // バグあり。
      // 内容：
      // 1. 一番最初のデータが（グラフクリックに紐づけると、クリックした状態の時に）更新されない　←チェックボックスリストでgetPopulationCompositionを呼ぶときにthenでdataを取ってきて、そのデータでgraphDataを設定すれば良い？　→　修正。グラフデータを比較して...　→　Y軸が見切れててデータを確認できない。　また、点の部分のデータが数字で表すなどしないと、正確にいくつかわからない。
      // 2. データが足りない
      // 3. 表を表示した後に2回目チェックボックスにチェックを入れると、データが降順ソートされない
      data.result.data.map((data) => {
        data.data.reverse();
      });

      setGraphData([
        {
          年: data.result.data[0].data[0].year,
          総人口人数: data.result.data[0].data[0].value,
        },
        {
          labels: data.result.data[0].data[1].year,
          総人口人数: data.result.data[0].data[1].value,
        },
      ]);
    } catch (error) {
      console.log("失敗：" + prefName + "人口構成データ取得✖");
    }
  };

  // getPopulationCompositionバックアップ
  // const getPopulationComposition = () => {
  //   const path =
  //     "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
  //     prefCode;
  //   fetch(path, {
  //     headers: { "x-api-key": "NJgaOz1cA7SlWcx91WGP2DgUTJ8T7AQ3SIImDCBg" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log("成功：" + prefName + "人口構成データ取得○");
  //       setPopulationCompositionObj(data);

  //       // チェックボックスにチェックが入ったら、グラフを表示させるようにしないと、X軸にautoなど、ユーザーがわからない情報が表示されてしまう。
  //       // → チェックボックスにチェックがが入ったら、グラフを表示させるように作る。
  //       // バグあり。
  //       // 内容：
  //       // 1. 一番最初のデータが（グラフクリックに紐づけると、クリックした状態の時に）更新されない　←チェックボックスリストでgetPopulationCompositionを呼ぶときにthenでdataを取ってきて、そのデータでgraphDataを設定すれば良い？　→　修正。グラフデータを比較して...　→　Y軸が見切れててデータを確認できない。　また、点の部分のデータが数字で表すなどしないと、正確にいくつかわからない。
  //       // 2. データが足りない
  //       // 3. 表を表示した後に2回目チェックボックスにチェックを入れると、データが降順ソートされない
  //       data.result.data.map((data) => {
  //         data.data.reverse();
  //       });

  //       setGraphData([
  //         {
  //           年: data.result.data[0].data[0].year,
  //           総人口人数: data.result.data[0].data[0].value,
  //         },
  //         {
  //           labels: data.result.data[0].data[1].year,
  //           総人口人数: data.result.data[0].data[1].value,
  //         },
  //       ]);
  //     })
  //     .catch((error) => {
  //       console.log("失敗：" + prefName + "人口構成データ取得✖");
  //     });
  // };

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
