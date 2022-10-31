import React, { useEffect, useState } from "react";

import ForceTreeChart from "./network/ForceTreeChart";
import Info from "./Info";
import Settings from "./Settings";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./reusable/TabPanel";

const App = () => {
  const [data, setData] = useState({});
  const [fileName, setFileName] = useState("");
  const [cliques, setCliques] = useState([]);
  const [activeTab, setActiveTab] = useState("settings");

  const handleChangeTab = (e, newTab) => {
    setActiveTab(newTab);
  };

  console.log(data);

  useEffect(() => {
    // API get data
    setData({
      nodes: [
        { name: "Alice", group: 1 },
        { name: "Bob", group: 1 },
        { name: "Chen", group: 2 },
        { name: "Dawg", group: 1 },
        { name: "Ethan", group: 2 },
        { name: "George", group: 1 },
        { name: "Frank", group: 1 },
        { name: "Hanes", group: 1 },
      ],
      links: [
        { source: "Alice", target: "Bob", value: 1 },
        { source: "Chen", target: "Bob", value: 2 },
        { source: "Dawg", target: "Chen", value: 3 },
        { source: "Hanes", target: "Frank", value: 4 },
        { source: "Hanes", target: "George", value: 5 },
        { source: "Dawg", target: "Ethan", value: 6 },
      ],
    });
  }, []);

  return (
    <div className="app">
      <h2 className="title-of-app">
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
        <Settings
          setData={setData}
          fileName={fileName}
          setFileName={setFileName}
          setCliques={setCliques}
        />
      </TabPanel>
      <TabPanel value={activeTab} index="network">
        <ForceTreeChart data={data} cliques={cliques} />
      </TabPanel>
      <TabPanel value={activeTab} index="info">
        <Info />
      </TabPanel>
    </div>
  );
};

export default App;
