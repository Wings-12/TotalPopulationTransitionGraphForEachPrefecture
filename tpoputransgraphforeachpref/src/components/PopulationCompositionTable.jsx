import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";

const PopulationCompositionTable = () => {
  const { t } = useTranslation(); // 翻訳関数の使用 tはそのまま使わないといけない
  const { populationCompositionObj } = useContext(PopulationCompositionContext);

  const sortInDescendingOrder = () => {
    if (
      populationCompositionObj.result &&
      populationCompositionObj.result.data
    ) {
      populationCompositionObj.result.data.map((data) => {
        data.data.reverse();
      });
    }
  };

  let totalPopulation = 0;

  return (
    populationCompositionObj.result && (
      <table border={"1"}>
        <tbody>
          <tr>
            <th>
              {sortInDescendingOrder()}
              {t("year")}
            </th>
            {populationCompositionObj.result.data.map((data4Types, i) => {
              // 人口の種類を英語のキーにマッピングするオブジェクト
              const populationTypeKeyToEnglish = {
                総人口: "total_population",
                年少人口: "youth_population",
                生産年齢人口: "working_age_population",
                老年人口: "elderly_population",
              };

              const populationTypeKey =
                populationTypeKeyToEnglish[data4Types.label];
              return (
                <Fragment key={i}>
                  <th>{t(populationTypeKey) + t("number_of_people")}</th>
                  <th>
                    {data4Types.label === "総人口"
                      ? t(populationTypeKey) + t("growth_rate")
                      : t(populationTypeKey) + t("percentage")}
                  </th>
                </Fragment>
              );
            })}
          </tr>

          {populationCompositionObj.result.data[0].data.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  {populationCompositionObj.result.data[0].data[index].year}
                </td>

                {populationCompositionObj.result.data.map((data4Types, i) => {
                  return (
                    <Fragment key={i}>
                      <td>{data4Types.data[index].value.toLocaleString()}</td>
                      <td>
                        {(() => {
                          let result = 0;
                          const lastIndex =
                            populationCompositionObj.result.data[0].data
                              .length - 1;
                          if (data4Types.label === "総人口") {
                            totalPopulation = data4Types.data[index].value;
                            return index !== lastIndex
                              ? (() => {
                                  result =
                                    ((totalPopulation /
                                      data4Types.data[index + 1].value -
                                      1) *
                                      100 *
                                      100) /
                                    100;
                                  return result.toFixed(2);
                                })() + "%"
                              : "-";
                          } else {
                            return (
                              (() => {
                                result =
                                  ((data4Types.data[index].value /
                                    totalPopulation) *
                                    100 *
                                    100) /
                                  100;
                                return result.toFixed(2);
                              })() + "%"
                            );
                          }
                        })()}
                      </td>
                    </Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
};

export default PopulationCompositionTable;
