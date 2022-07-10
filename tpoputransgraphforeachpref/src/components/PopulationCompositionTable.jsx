import React, { useContext, useState } from "react";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";

const PopulationCompositionTable = () => {
  const { populationCompositionObj, setPopulationCompositionObj } = useContext(
    PopulationCompositionContext
  );

  const population = "（人数）";
  const percentage = "（割合）";

  const [isSortedInDescendingOrder, setIsSortedInDescendingOrder] =
    useState(false);

  const sortInDescendingOrder = () => {

  }

  return (
    <table border={"1"}>
      {() => {if (isSortedInDescendingOrder === false){
        sortInDescendingOrder();
      }}}
      <tr>
        <tr>西暦</tr>
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
          {console.log(
            populationCompositionObj.result &&
              populationCompositionObj.result.data[0]
          )}
          {populationCompositionObj.result &&
            populationCompositionObj.result.data[0].data[0].year}
        </td>

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
    </table>
  );
};

export default PopulationCompositionTable;
