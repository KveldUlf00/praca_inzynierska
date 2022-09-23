import React, { useEffect, useState } from "react";

import ForceTreeChart from "./ForceTreeChart";
import Info from "./Info";
import Settings from "./Settings";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";

const App = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("settings");

  const handleChangeTab = (e, newTab) => {
    setActiveTab(newTab);
  };

  const changeData = (elements) => {
    console.log(elements);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      <h2>
        Development of a Web application for the selection of groups in a
        complex network
      </h2>
      <Tabs
        className="tab-panel"
        value={activeTab}
        onChange={handleChangeTab}
        textColor="inherit"
        aria-label="Main menu tabs"
        centered
      >
        <Tab value="settings" label="Settings" />
        <Tab
          value="network"
          label="Network"
          disabled={Object.keys(data).length === 0}
        />
        <Tab value="info" label="Info" />
      </Tabs>
      <TabPanel value={activeTab} index="settings">
        <Settings setData={setData} />
      </TabPanel>
      <TabPanel value={activeTab} index="network">
        <ForceTreeChart data={data} />
      </TabPanel>
      <TabPanel value={activeTab} index="info">
        <Info />
      </TabPanel>
    </div>
  );
};

export default App;
