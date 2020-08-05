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
  .passwordDiv {
    margin-top: 2rem;
    display: flex;
    background-color: ${theme.inputBackgroundColor};
  }
  .passwordInput {
    margin-top: 0rem;
  }

  .iconDiv {
    transform: translate(-1rem, 0.8rem);
  }
`;

const Login = () => {
  const [passwordVisible, _setPasswordVisible] = React.useState(false);
  const history = useHistory();
  return (
    <AuthLayout route='/signup'>
      <button
        onClick={() => history.push(`/signup`)}
        className='button topButton'
      >
        Create Account
      </button>
      <Container className='columns'>
        <div className='column is-5'>
          <h1 className='title is-3 has-text-weight-semi-bold'>Login</h1>
          <form autoComplete="none">
            <input className='input' placeholder='Email' />
          </form>
          <div className='passwordDiv'>
            <input
              className='input passwordInput'
              type={passwordVisible ? "text" : "password"}
              placeholder='Password'
            />
            <div
              className='iconDiv'
              onClick={() => _setPasswordVisible(!passwordVisible)}
            >
              <span className='icon is-size-4'>
                <i
                  className={
                    passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"
                  }
                />
              </span>
            </div>
          </div>
          <div className='columns paddingTop is-vcentered'>
            <div className='column is-6'>
              <h1 className='title is-6 has-text-weight-semi-bold'>
                Forgot Password ?
              </h1>
            </div>
            <div className='column is-6 alignToRight'>
              <button className='button is-primary'>Login</button>
            </div>
          </div>
        </div>
      </Container>
    </AuthLayout>
  );
};
export default Login;
