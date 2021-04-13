import { createGlobalStyle } from "styled-components";
import InterRegular from "./Inter-Regular.ttf";

export default createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: local('InterRegular'),
    url(${InterRegular}) format('ttf');
  }
`;
