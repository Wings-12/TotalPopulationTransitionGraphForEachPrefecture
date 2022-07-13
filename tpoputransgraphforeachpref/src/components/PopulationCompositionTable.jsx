import React, { useContext } from "react";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";

const PopulationCompositionTable = () => {
  const { populationCompositionObj, setPopulationCompositionObj } = useContext(
    PopulationCompositionContext
  );

  const population = "（人数）";
  const percentage = "（割合）";

 

  let totalPopulation = 0;

  return (
    <table border={"1"}>
      <tbody>
        <tr>
          <tr>西暦</tr>
          {populationCompositionObj.result &&
            populationCompositionObj.result.data.map((data) => {
              return (
                <>
                  <th>{data.label + population}</th>
                  <th>
                    {data.label === "総人口"
                      ? data.label + "（増加率）"
                      : data.label + percentage}
                  </th>
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
                  {console.log(data.data)}
                  <th>{data.data[0].value}</th>
                  <th>
                    {(() => {
                      if (data.label === "総人口") {
                        totalPopulation = data.data[0].value;
                        return (
                          Math.round(
                            (totalPopulation / data.data[1].value - 1) * 100
                          ) / 100
                        );
                      } else {
                        return (Math.round(data.data[0].value / totalPopulation * 100) / 100)
                      }
                    })()}
                    %
                  </th>
                </>
              );
            })}
        </tr>
      </tbody>
    </table>
  );
};

export default PopulationCompositionTable;
