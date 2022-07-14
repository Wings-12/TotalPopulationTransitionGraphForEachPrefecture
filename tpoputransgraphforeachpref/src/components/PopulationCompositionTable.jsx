import React, { Fragment, useContext } from "react";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";

const PopulationCompositionTable = () => {
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

  const population = "（人数）";
  const percentage = "（割合）";

  let totalPopulation = 0;

  return (
    populationCompositionObj.result && (
      <table border={"1"}>
        <tbody>
          <tr>
            <th>{sortInDescendingOrder()}西暦</th>
            {populationCompositionObj.result.data.map((data4Types, i) => {
              return (
                <Fragment key={i}>
                  <th>{data4Types.label + population}</th>
                  <th>
                    {data4Types.label === "総人口"
                      ? data4Types.label + "（増加率）"
                      : data4Types.label + percentage}
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
