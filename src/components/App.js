import React, { useEffect, useState } from "react";
import ForceTreeChart from "./ForceTreeChart";

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // API get data
    setData({
      name: "main",
      children: [
        {
          name: "child1",
          children: [
            {
              name: "gr1",
            },
            {
              name: "gr2",
            },
            {
              name: "gr3",
            },
          ],
        },
        {
          name: "child1",
          children: [
            {
              name: "gr1",
            },
            {
              name: "gr2",
            },
            {
              name: "gr3",
            },
          ],
        },
        {
          name: "child1",
          children: [
            {
              name: "gr1",
            },
            {
              name: "gr2",
            },
            {
              name: "gr3",
            },
          ],
        },
        {
          name: "child1",
          children: [
            {
              name: "gr1",
            },
            {
              name: "gr2",
            },
            {
              name: "gr3",
            },
          ],
        },
        {
          name: "child2",
        },
      ],
    });
  }, []);

  return (
    <div className="app">
      <h2>D3 Force Layout</h2>
      <ForceTreeChart data={data} />
    </div>
  );
};

export default App;
