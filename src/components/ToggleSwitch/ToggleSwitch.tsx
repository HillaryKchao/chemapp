import React from "react";

import "./ToggleSwitch.scss";

type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  name: string;
  optionLabels?: string[];
  small?: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
  styleOptions?: React.CSSProperties;
};

const ToggleSwitch = (props: ToggleSwitchProps) => {
  const {
    optionLabels = ["Yes", "No"],
    small = false,
    disabled = false,
    id,
    checked,
    name,
    onChange,
    styleOptions = {},
  } = props;
  return (
    <div
      className={"toggle-switch" + (small ? " small-switch" : "")}
      style={styleOptions}
    >
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {id ? (
        <label className="toggle-switch-label" htmlFor={id}>
          <span
            className={
              disabled
                ? "toggle-switch-inner toggle-switch-disabled"
                : "toggle-switch-inner"
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
          />
          <span
            className={
              disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
            }
          />
        </label>
      ) : null}
    </div>
  );
};

export default ToggleSwitch;
