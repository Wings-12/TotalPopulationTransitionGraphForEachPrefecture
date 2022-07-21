import React, { Fragment, useContext, useState } from "react";
import { LineChart, Line, XAxis, CartesianGrid, Legend, YAxis } from "recharts";
import { PopuComposContext } from "./providers/PopuComposProvider";
import { GraphDataContext } from "./providers/GraphDataProvider";

export const LineGraph = () => {
  const { populationCompositionObj, setPopulationCompositionObj } =
    useContext(PopuComposContext);

  const { graphData, setGraphData } = useContext(GraphDataContext);

  console.log(graphData);

  return (
    <div>
      <LineChart width={700} height={500} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="年" interval="preserveStartEnd" />
        <YAxis width={100} />
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
