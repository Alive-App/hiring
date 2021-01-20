import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.sass";

const AlertPopup = ({ message, toggle }) => {
  const setActive = useCallback(
    (active) => {
      toggle(active);
    },
    [toggle]
  );

  return (
    <div className={`alert-popup ${message !== "" ? "active" : ""}`}>
      <span className="message">{message}</span>
      <FontAwesomeIcon
        className="icon"
        icon="times"
        onClick={() => {
          setActive(false);
        }}
      />
    </div>
  );
};

export default AlertPopup;
