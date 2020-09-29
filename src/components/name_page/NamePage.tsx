import React, { useRef, useEffect, useState } from "react";
import { cloneDeep } from "lodash";

// import { typeset } from "../../utilities/MathJaxUtils";
import Shuffle from "../../utilities/Shuffle";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import styles from "./NamePage.module.scss";

import { INameFormula } from "../../models/NameFormula.model";
import compoundJson from "../../data/CompounNames.json";
const compoundData: INameFormula[] = cloneDeep(compoundJson as INameFormula[]);

const NamePage = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [reload, setReload] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      typeset(() => divRef.current!);
    }
  }, [showAnswer, reload]);

  const ShuffleData = () => {
    Shuffle(compoundData);
    compoundData.forEach((value, index) => {
      if (Math.random() < 0.5) {
        value.nameFirst = true;
      } else {
        value.nameFirst = false;
      }
    });
  };

  const typeset = (selector: () => HTMLElement) => {
    const mathJax = (window as any).MathJax;
    // If MathJax script hasn't been loaded yet, then do nothing.

    if (!mathJax) {
      return null;
    }

    if (!mathJax.startup.promise) {
      return null;
    }

    mathJax.startup.promise = mathJax.startup.promise
      .then(() => {
        setReload(false);
        selector();
        return mathJax.typesetPromise();
      })
      .catch((err: any) => console.error(`Typeset failed: ${err.message}`));
    return mathJax.startup.promise;
  };

  const handleToggle = (val: boolean) => {
    setShowAnswer(val);
  };

  const handleReload = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    ShuffleData();
    setReload(true);
    setShowAnswer(false);
  };

  return (
    <div ref={divRef}>
      <div className={styles.OptionRow} style={{ marginTop: "50px" }}>
        <div
          className={styles.RoundButton}
          style={{ marginRight: "100px" }}
          onClick={handleReload}
        >
          RELOAD
        </div>
        <div className={styles.ToggleContainer}>
          <ToggleSwitch
            id={`checkanswer`}
            name={`checkanswer`}
            onChange={handleToggle}
            checked={showAnswer}
            optionLabels={["Show", "Hide"]}
          ></ToggleSwitch>
          <label htmlFor="checkanswer">When ready, check your answer!</label>
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>
        <table style={{ marginLeft: "auto", marginRight: "auto" }}>
          <tbody>
            {compoundData.map((compound, index) => {
              return showAnswer ? (
                <tr key={index}>
                  <td style={{ textAlign: "right" }}>
                    {compound.nameFirst
                      ? compound.name
                      : `\\(\\ce{${compound.formula}}\\)`}
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {compound.nameFirst
                      ? `\\(\\ce{${compound.formula}}\\)`
                      : compound.name}
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td style={{ textAlign: "right" }}>
                    {compound.nameFirst
                      ? compound.name
                      : `\\(\\ce{${compound.formula}}\\)`}
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {" "}
                    {`_____________________`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NamePage;
