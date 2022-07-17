import React, { Fragment, useContext, useState } from "react";
import { LineChart, Line, XAxis, CartesianGrid, Legend, YAxis } from "recharts";
import { PopulationCompositionContext } from "./providers/PopulationCompositionProvider";
import { GraphDataContext } from "./providers/GraphDataProvider";

export const LineGraph = () => {
  const { populationCompositionObj, setPopulationCompositionObj } = useContext(
    PopulationCompositionContext
  );

  const { graphData, setGraphData } = useContext(GraphDataContext);

  console.log(graphData);

  return (
    <div>
      <LineChart width={700} height={500} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="labels" interval="preserveStartEnd" />
        <YAxis interval="preserveStartEnd" />
        <Legend />
        <Line
          type="monotone"
          dataKey="総人口人数"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default LineGraph;
