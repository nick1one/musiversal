import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import store from "./store/store";

const StyledContainer = styled.div`
  display: grid;
  height: 100vh;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 353px 1fr;
  grid-template-rows: 85px 1fr;
`;

function App() {
  return (
    <Provider store={store}>
      <StyledContainer className="App">
        <Header />
        <Sidebar />
        <Main />
      </StyledContainer>
    </Provider>
  );
}

export default App;
