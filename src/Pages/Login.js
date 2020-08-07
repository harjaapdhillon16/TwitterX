import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

import AuthLayout from "../components/AuthLayout";
import { theme } from "./../utils/theme";
import firebase from "../firebase/config";

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

function validateEmail(val) {
  var re = /\S+@\S+\.\S+/;
  return re.test(val);
}

const Loading = () => (
  <Loader type='Puff' color='#00BFFF' height={40} width={40} />
);

const Login = () => {
  const [passwordVisible, _setPasswordVisible] = React.useState(false);

  const [load, _setLoad] = React.useState(<div />);

  const history = useHistory();

  function navigateToSignup() {
    history.push(`/signup`);
  }

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const OnChangeVal = (key, event) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const onSubmit = () => {
    for (let key in values) {
      console.log(key);
      if (key === "") {
        return alert(`please provide a ${key}`);
      }
    }
    if (!validateEmail(values.email)) {
      return alert("Please provide a valid email");
    }
    _setLoad(<Loading />);
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((credentials) => {
        const uid = credentials.user.uid;
        localStorage.setItem("uid", uid);
        history.push("/feed");
      })
      .catch((err) => {
        _setLoad(<div />);
        return alert(err.message);
      });
  };

  return (
    <AuthLayout route='/signup'>
      <button onClick={navigateToSignup} className='button topButton'>
        Create Account
      </button>
      <Container className='columns'>
        <div className='column is-5'>
          <h1 className='title is-3 has-text-weight-semi-bold'>Login</h1>
          <form autoComplete='none'>
            <input
              onChange={(event) => OnChangeVal("email", event)}
              value={values.email}
              className='input'
              placeholder='Email'
            />
          </form>
          <div className='passwordDiv'>
            <input
              onChange={(event) => OnChangeVal("password", event)}
              value={values.password}
              className='input passwordInput'
              type={passwordVisible ? "text" : "password"}
              placeholder='Password'
            />
            <div
              className='iconDiv'
              onClick={() => _setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <span className='icon is-size-4'>
                  <i className='fas fa-eye-slash' />
                </span>
              ) : (
                <div>
                  <span className='icon is-size-4'>
                    <i className='fas fa-eye' />
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='columns paddingTop is-vcentered is-multiline'>
            <div className='column is-6'>
              <h1 className='title is-6 has-text-weight-semi-bold'>
                Forgot Password ?
              </h1>
            </div>
            <div className='column is-6 alignToRight'>
              <button onClick={onSubmit} className='button is-primary'>
                Login
              </button>
            </div>
            <div className='column is-6 alignToRight'>{load}</div>
          </div>
        </div>
      </Container>
    </AuthLayout>
  );
};
export default Login;
