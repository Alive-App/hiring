import React from "react";

import { AppStore } from "../../store";

import "./styles.sass";

const DateSwitch = () => {
  const dateMode = AppStore.useState((state) => state.dateMode);

  const changeDateMode = (mode) => {
    AppStore.update((state) => {
      state.previousDateMode = state.dateMode;
      state.dateMode = mode;
    });
  };

  return (
    <div className="date-switch">
      <span
        className={`option ${dateMode === 0 ? "active" : ""}`}
        onClick={() => {
          changeDateMode(0);
        }}
      >
        Dia
      </span>
      <span
        className={`option ${dateMode === 1 ? "active" : ""}`}
        onClick={() => {
          changeDateMode(1);
        }}
      >
        Mês
      </span>
      <span
        className={`option ${dateMode === 2 ? "active" : ""}`}
        onClick={() => {
          changeDateMode(2);
        }}
      >
        Ano
      </span>
    </div>
  );
};

export default DateSwitch;
