import { useState } from "react";
import PropTypes from "prop-types";

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
  whichCliqueDegree,
  setWhichCliqueDegree,
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
          data={data}
          cliquesData={cliquesData}
          whichClique={whichClique}
          setWhichClique={setWhichClique}
          whichCliqueDegree={whichCliqueDegree}
          setWhichCliqueDegree={setWhichCliqueDegree}
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

Properties.propTypes = {
  data: PropTypes.object.isRequired,
  cliquesData: PropTypes.array.isRequired,
  whichClique: PropTypes.array.isRequired,
  setWhichClique: PropTypes.func.isRequired,
  whichCliqueDegree: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setWhichCliqueDegree: PropTypes.func.isRequired,
  cliqueSet: PropTypes.array.isRequired,
  setCliqueSet: PropTypes.func.isRequired,
  dependencyNode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setDependencyNode: PropTypes.func.isRequired,
};

export default Properties;
