import styled from "styled-components";

import TopBar from "./TopBar";
import Chart from "./Chart";
import StockDetails from "./StockDetails";
import Simulation from "./Simulation";
import DateSwitch from "./DateSwitch";
import AlertPopup from "./AlertPopup";

const Input = styled.input`
  height: 42px;
  padding: 0 25px;
  margin: 0 5px 10px 0;

  border-radius: 5px;
  border: none;

  background-color: #606371;
  color: white;
  transition: 0.2s ease;

  &::placeholder {
    color: white;
    opacity: 0.5;
  }

  &:hover {
    background-color: #808391;
  }
`;

const Button = styled.button`
  height: 42px;
  padding: 0 25px;
  margin: 0 5px 10px 0;

  border-radius: 5px;
  border: none;

  background-color: #f7af3e;
  color: white;

  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #de9536;
  }
`;

export {
  TopBar,
  Chart,
  StockDetails,
  Simulation,
  DateSwitch,
  AlertPopup,
  Input,
  Button,
};
