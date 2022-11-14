import React, { useState } from "react";

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
  const [corruptedAttr, setCorruptedAttr] = useState([]);

  const handleChangeTab = (e, newTab) => {
    setActiveTab(newTab);
  };

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
          corruptedAttr={corruptedAttr}
          setCorruptedAttr={setCorruptedAttr}
        />
      </TabPanel>
      <TabPanel value={activeTab} index="network">
        <ForceTreeChart
          data={data}
          cliques={cliques}
          corruptedAttr={corruptedAttr}
        />
      </TabPanel>
      <TabPanel value={activeTab} index="info">
        <Info />
      </TabPanel>
    </div>
  );
};

export default App;
