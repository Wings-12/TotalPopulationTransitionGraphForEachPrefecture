import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import CheckBox from "./components/CheckBox";

export const App = () => {
  const [prefecturesObj, setPrefecturesObj] = useState([]);

  useEffect(() => {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: { "x-api-key": "NJgaOz1cA7SlWcx91WGP2DgUTJ8T7AQ3SIImDCBg" },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrefecturesObj(data);
      });
  }, []);

  return (
    <Fragment>
      <CheckBox label={prefecturesObj.result}></CheckBox>
    </Fragment>
  );
};
