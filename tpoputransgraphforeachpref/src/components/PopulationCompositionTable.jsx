import React, { useContext } from "react";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";

const PopulationCompositionTable = () => {
  const { populationCompositionObj, setPopulationCompositionObj } = useContext(
    PopulationCompositionContext
  );

  const population = "（人数）";
  const percentage = "（割合）";

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

  return (
    <table border={"1"}>
      <tr>
        <tr>{sortInDescendingOrder()}西暦</tr>
        {populationCompositionObj.result &&
          populationCompositionObj.result.data.map((data) => {
            return (
              <>
                <th>{data.label + population}</th>
                <th>{data.label + percentage}</th>
              </>
            );
          })}
      </tr>
      <tr>
        <td>
          {populationCompositionObj.result &&
            populationCompositionObj.result.data[0].data[0].year}
        </td>

        {populationCompositionObj.result &&
          populationCompositionObj.result.data.map((data) => {
            return (
              <>
                <th>{data.data[0].value}</th>
                <th>
                  {Math.round(
                    (data.data[0].value / data.data[1].value - 1) * 100
                  ) / 100}
                  %
                </th>
              </>
            );
          })}
      </tr>
    </table>
  );
};

export default PopulationCompositionTable;
