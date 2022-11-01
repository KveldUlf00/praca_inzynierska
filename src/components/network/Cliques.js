import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SelectMui from "../reusable/SelectMui";
import ButtonMui from "../reusable/ButtonMui";

const Cliques = ({
  data,
  cliquesData,
  whichClique,
  setWhichClique,
  whichCliqueDegree,
  setWhichCliqueDegree,
  cliqueSet,
  setCliqueSet,
}) => {
  const [degrees, setDegrees] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [filterCliquesBy, setFilterCliquesBy] = useState("");

  const handleClique = (e) => {
    const title = e.target.title;
    if (title === whichClique.join("-")) {
      setWhichClique([]);
    } else {
      setWhichClique(title.split("-"));
    }
  };

  const generateCliqueSets = () => {
    if (cliquesData.length > 0) {
      if (filterCliquesBy) {
        return cliqueSet
          .filter((clique) => clique.includes(filterCliquesBy))
          .map((elem) => (
            <ButtonMui
              key={elem}
              title={elem}
              chosen={elem === whichClique.join("-")}
              onClick={(elem) => handleClique(elem)}
            />
          ));
      } else {
        return cliqueSet.map((elem) => (
          <ButtonMui
            key={elem}
            title={elem}
            chosen={elem === whichClique.join("-")}
            onClick={(elem) => handleClique(elem)}
          />
        ));
      }
    }
  };

  useEffect(() => {
    const calculations = [];

    cliquesData.forEach((elem) => {
      !calculations.some((calc) => calc.value === elem.length) &&
        calculations.push({
          value: elem.length,
          name: `Degree ${elem.length}`,
        });
    });

    setDegrees(calculations.concat({ name: "Reset", value: -1 }));
  }, [cliquesData, whichClique]);

  useEffect(() => {
    setCliqueSet(
      cliquesData
        .filter((elem) => elem.length === whichCliqueDegree)
        .map((fElem) => fElem.join("-"))
    );
  }, [cliquesData, setCliqueSet, whichCliqueDegree]);

  useEffect(() => {
    setNodes(
      data.nodes
        .map((elem) => ({ value: elem.name, name: elem.name }))
        .concat({ name: "Reset", value: -1 })
    );
  }, [data]);

  useEffect(() => {
    if (filterCliquesBy === -1) {
      setFilterCliquesBy("");
    }
  }, [filterCliquesBy]);

  return (
    <div className="cliques">
      <div className="cliques__selects">
        {degrees.length > 0 && (
          <SelectMui
            className="cliques__selects__degree"
            name="Clique degree"
            value={whichCliqueDegree}
            setValue={setWhichCliqueDegree}
            options={degrees}
          />
        )}
        {nodes.length > 0 && whichCliqueDegree && (
          <SelectMui
            name="Filter cliques by"
            value={filterCliquesBy}
            setValue={setFilterCliquesBy}
            options={nodes}
          />
        )}
      </div>
      <div className="dataSet">{generateCliqueSets()}</div>
    </div>
  );
};

Cliques.propTypes = {
  data: PropTypes.object.isRequired,
  cliquesData: PropTypes.array.isRequired,
  whichClique: PropTypes.array.isRequired,
  setWhichClique: PropTypes.func.isRequired,
  whichCliqueDegree: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setWhichCliqueDegree: PropTypes.func.isRequired,
  cliqueSet: PropTypes.array.isRequired,
  setCliqueSet: PropTypes.func.isRequired,
};

export default Cliques;
