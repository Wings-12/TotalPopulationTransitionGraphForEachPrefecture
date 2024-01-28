import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
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
  }, [i18n.language]);

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
        // console.log(regionCounts);
        // console.log(Object.values(regionCounts));
        const startIndex = Object.values(regionCounts)
          .slice(0, regionIndex)
          .reduce((sum, currentCount) => sum + currentCount, 0);
        // console.log(startIndex);

        // 日本語の地域名を英語のキーにマッピングするオブジェクト
        const regionNameToKey = {
          北海道: "Hokkaido",
          東北: "Tohoku",
          関東: "Kanto",
          中部: "Chubu",
          近畿: "Kinki",
          中国: "Chugoku",
          四国: "Shikoku",
          九州: "Kyushu",
          沖縄: "Okinawa",
          // Make sure to include all possible regions that can appear.
        };

        const regionKey = regionNameToKey[regionName];

        // 日本語の都道府県名を英語のキーにマッピングするオブジェクト
        const prefectureNameToKey = {
          北海道: "Hokkaido",
          青森県: "Aomori",
          岩手県: "Iwate",
          宮城県: "Miyagi",
          秋田県: "Akita",
          山形県: "Yamagata",
          福島県: "Fukushima",
          茨城県: "Ibaraki",
          栃木県: "Tochigi",
          // Adding more prefectures
          群馬県: "Gunma",
          埼玉県: "Saitama",
          千葉県: "Chiba",
          東京都: "Tokyo",
          神奈川県: "Kanagawa",
          新潟県: "Niigata",
          富山県: "Toyama",
          石川県: "Ishikawa",
          福井県: "Fukui",
          山梨県: "Yamanashi",
          長野県: "Nagano",
          岐阜県: "Gifu",
          静岡県: "Shizuoka",
          愛知県: "Aichi",
          三重県: "Mie",
          滋賀県: "Shiga",
          京都府: "Kyoto",
          大阪府: "Osaka",
          兵庫県: "Hyogo",
          奈良県: "Nara",
          和歌山県: "Wakayama",
          鳥取県: "Tottori",
          島根県: "Shimane",
          岡山県: "Okayama",
          広島県: "Hiroshima",
          山口県: "Yamaguchi",
          徳島県: "Tokushima",
          香川県: "Kagawa",
          愛媛県: "Ehime",
          高知県: "Kochi",
          福岡県: "Fukuoka",
          佐賀県: "Saga",
          長崎県: "Nagasaki",
          熊本県: "Kumamoto",
          大分県: "Oita",
          宮崎県: "Miyazaki",
          鹿児島県: "Kagoshima",
          沖縄県: "Okinawa",
        };

        return (
          <div key={regionName} style={styles.region}>
            <h3>{t(`regions.${regionKey}`)}</h3>
            {prefecturesObj.result &&
              prefecturesObj.result
                .slice(startIndex, startIndex + count)
                .map((eachResult, i) => {
                  // 日本語の都道府県名を翻訳キーに変換
                  const prefectureKey =
                    prefectureNameToKey[eachResult.prefName];
                  return (
                    <label
                      key={eachResult.prefCode}
                      style={styles.prefectureCheckbox}
                    >
                      {t(`prefNames.${prefectureKey}`)}
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
