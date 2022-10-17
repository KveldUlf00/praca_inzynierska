import { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../reusable/TabPanel";
import Cliques from "./Cliques";
import Dependency from "./Dependency";

const Properties = ({
  data,
  cliquesData,
  whichClique,
  setWhichClique,
  cliqueSet,
  setCliqueSet,
  dependencyNode,
  setDependencyNode,
}) => {
  const [activeTab, setActiveTab] = useState("cliques");

  const handleChangeTab = (e, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <div className="properties">
      <Tabs
        className="tab-panel"
        value={activeTab}
        onChange={handleChangeTab}
        textColor="inherit"
        aria-label="Main menu tabs"
        centered
      >
        <Tab value="cliques" label="Cliques" />
        <Tab value="dependency" label="Dependency" />
      </Tabs>
      <TabPanel value={activeTab} index="cliques">
        <Cliques
          cliquesData={cliquesData}
          whichClique={whichClique}
          setWhichClique={setWhichClique}
          cliqueSet={cliqueSet}
          setCliqueSet={setCliqueSet}
        />
      </TabPanel>
      <TabPanel value={activeTab} index="dependency">
        <Dependency
          data={data}
          dependencyNode={dependencyNode}
          setDependencyNode={setDependencyNode}
        />
      </TabPanel>
    </div>
  );
};

export default Properties;
