import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { theme } from "./../utils/theme";

const Container = styled.div`
  padding-top: 3rem;
  .paddingTop {
    padding-top: 1rem;
  }
  .alignToRight {
    text-align: right;
  }
  button {
    padding: 0rem 2rem;
    background-color: ${theme.primaryColor} !important;
  }
`;

const Signup = () => {
  const history = useHistory();
  return (
    <AuthLayout buttonText='Login' >
      <button
        onClick={() => history.push(`/`)}
        className='button topButton'
      >
        Login
      </button>
      <Container className='columns'>
        <div className='column is-5'>
          <h1 className='title is-3 has-text-weight-semi-bold'>
            Create Account
          </h1>
          <input className='input' placeholder='Name' />
          <input className='input' placeholder='Email' />

          <input className='input' placeholder='Password' />

          <input className='input' placeholder='Confirm Password' />

          <div className='columns paddingTop is-vcentered'>
            <div className='column is-12 alignToRight'>
              <button className='button is-primary'>Sign Up</button>
            </div>
          </div>
        </div>
      </Container>
    </AuthLayout>
  );
};
export default Signup;
