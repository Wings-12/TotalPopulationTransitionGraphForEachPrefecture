import React, { useContext, useEffect, useState } from "react";
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

  // 地方ごとの都道府県をマッピングするオブジェクトを作成
  const regions = {
    北海道: ["北海道"],
    東北: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    関東: [
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
    ],
    中部: [
      "新潟県",
      "富山県",
      "石川県",
      "福井県",
      "山梨県",
      "長野県",
      "岐阜県",
      "静岡県",
      "愛知県",
    ],
    近畿: [
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
    ],
    中国: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
    四国: ["徳島県", "香川県", "愛媛県", "高知県"],
    九州: [
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
    ],
    沖縄: ["沖縄県"],
  };

  // 地方名を配列で保持
  const regionNames = Object.keys(regions);

  // 地方ごとの都道府県の数をマッピングするオブジェクトを作成
  const regionCounts = {
    北海道: 1,
    東北: 6,
    関東: 7,
    中部: 9,
    近畿: 7,
    中国: 5,
    四国: 4,
    九州: 7,
    沖縄: 1,
  };

  // Reactのインラインスタイルを定義
  const styles = {
    regionsContainer: {
      display: "flex",
      flexWrap: "wrap", // 地方が多い場合に折り返す
    },
    region: {
      display: "flex",
      flexDirection: "column", // 地方ごとの都道府県を縦に並べる
      marginRight: "20px", // 地方のコンテナ間の余白
    },
    prefectureCheckbox: {
      marginBottom: "5px", // チェックボックス間の余白
    },
  };

  // コンポーネントの描画部分
  return (
    <div style={styles.regionsContainer}>
      {Object.entries(regionCounts).map(([regionName, count], regionIndex) => {
        // 各地方の開始インデックスを計算
        const startIndex = Object.values(regionCounts)
          .slice(0, regionIndex)
          .reduce((sum, currentCount) => sum + currentCount, 0);

        return (
          <div key={regionName} style={styles.region}>
            <h3>{regionName}</h3>
            {prefecturesObj.result &&
              prefecturesObj.result
                .slice(startIndex, startIndex + count)
                .map((eachResult, i) => {
                  return (
                    <label
                      key={eachResult.prefCode}
                      style={styles.prefectureCheckbox}
                    >
                      {eachResult.prefName}
                      <CheckBox
                        id={eachResult.prefCode}
                        onChange={(event) => {
                          handleChange(event, eachResult.prefCode);
                        }}
                        checked={checkedItem[eachResult.prefCode] || false}
                      />
                    </label>
                  );
                })}
          </div>
        );
      })}
    </div>
  );
};

export default CheckBoxList;
