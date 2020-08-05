import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { theme } from "../utils/theme";

const Container = styled.div`
  .redText {
    color: ${theme.primaryColor} !important;
  }
  .topButton {
    border: 1px solid ${theme.black};
    font-weight: bold;
    padding: 0rem 3rem;
    border-radius: 10px;
  }
  input {
    margin-top: 1.8rem;
    height: 3rem;
    border-width: 0px;
    background-color: ${theme.inputBackgroundColor};
    box-shadow: none !important;
  }
`;

const AuthLayout = ({ children, }) => {
  return (
    <Container className='container'>
      <section className='section'>
        <h1 className='title is-3 redText'>TweetX</h1>
        {children}
      </section>
    </Container>
  );
};
export default AuthLayout;
