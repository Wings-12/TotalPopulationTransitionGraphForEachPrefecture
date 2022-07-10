import React, { useContext } from "react";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";

const CheckBox = (props) => {
  const { populationCompositionObj, setPopulationCompositionObj } = useContext(
    PopulationCompositionContext
  );
  const prefName = props.eachResult && props.eachResult.prefName;
  const prefCode = props.eachResult && props.eachResult.prefCode;

  const handleChange = async (event) => {
    if (event.target.checked === true) {
      const path =
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
        prefCode;

      await fetch(path, {
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

export default CheckBox;
