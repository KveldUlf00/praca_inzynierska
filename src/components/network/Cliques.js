import { useEffect, useState } from "react";
import SelectMui from "../reusable/SelectMui";
import ButtonMui from "../reusable/ButtonMui";

const Cliques = ({
  cliquesData,
  whichClique,
  setWhichClique,
  cliqueSet,
  setCliqueSet,
}) => {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    const calculations = [];

    cliquesData.forEach((elem) => {
      !calculations.some((calc) => calc.value === elem.length) &&
        calculations.push({
          value: elem.length,
          name: `Degree ${elem.length}`,
        });
    });

    setDegrees(calculations);
  }, [cliquesData]);

  useEffect(() => {
    setCliqueSet(
      cliquesData
        .filter((elem) => elem.length === whichClique)
        .map((fElem) => fElem.join("-"))
    );
  }, [cliquesData, setCliqueSet, whichClique]);

  return (
    <div className="cliques">
      <div>
        {degrees.length > 0 && (
          <SelectMui
            name="Clique degree"
            value={whichClique}
            setValue={setWhichClique}
            options={degrees}
          />
        )}
      </div>
      <div className="dataSet">
        {cliquesData.length > 0 &&
          cliqueSet.map((elem) => (
            <ButtonMui title={elem} onClick={() => console.log("hehe")} />
          ))}
      </div>
    </div>
  );
};

export default Cliques;
