import React, { useRef, useEffect, useState } from "react";

import { typeset } from "../../utilities/MathJaxUtils";
import { ShuffleData, compoundData } from "../../utilities/Data";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import styles from "./NamePage.module.scss";

const NamePage = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [reload, setReload] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      setReload(false);
      typeset(() => divRef.current!);
    }
  }, [showAnswer, reload]);

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
