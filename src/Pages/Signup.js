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
`;

function validateEmail(val) {
  var re = /\S+@\S+\.\S+/;
  return re.test(val);
}

const Loading = () => (
  <Loader type='Puff' color='#00BFFF' height={40} width={40} />
);

const Signup = () => {
  const history = useHistory();

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [load, _setLoad] = React.useState(<div />);

  const OnChangeVal = (key, event) => {
    setValues({ ...values, [key]: event.target.value });
  };

  function navigateToLogin() {
    history.push(`/`);
  }

  const onSubmit = () => {
    for (let key in values) {
      if (values[key] === "") {
        return alert(`Please provide a ${key}`);
      }
    }
    if (values.confirmedPassword !== values.password) {
      return alert(`The two passwords and don't match`);
    }
    if (values.password.length < 6) {
      return alert(`Password should be bigger then 6 characters`);
    }
    if (!validateEmail(values.email)) {
      return alert(`Provide a valid email please`);
    }
    _setLoad(<Loading />);
    SignUpWithFirebase();
  };

  const SignUpWithFirebase = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async (credentials) => {
        const uid = credentials.user.uid;
        localStorage.setItem("uid", uid);
        firebase.database().ref(`users/${uid}`).set({
          name: values.name,
          email: values.email,
          uid: uid,
          posts: 0,
          following: 0,
          followers: 0,
        });
        history.push(`/feed`);
      })
      .catch((err) => {
        _setLoad(<div />);
        return alert(err.message);
      });
  };

  return (
    <AuthLayout buttonText='Login'>
      <button onClick={navigateToLogin} className='button topButton'>
        Login
      </button>
      <Container className='columns'>
        <div className='column is-5'>
          <h1 className='title is-3 has-text-weight-semi-bold'>
            Create Account
          </h1>
          <input
            onChange={(event) => OnChangeVal("name", event)}
            value={values.name}
            className='input'
            placeholder='Name'
          />
          <input
            onChange={(event) => OnChangeVal("email", event)}
            value={values.email}
            className='input'
            placeholder='Email'
          />
          <form autoComplete='none'>
            <input
              onChange={(event) => OnChangeVal("password", event)}
              value={values.password}
              className='input'
              placeholder='Password'
              type='password'
            />
          </form>
          <form autoComplete='none'>
            <input
              onChange={(event) => OnChangeVal("confirmedPassword", event)}
              value={values.confirmedPassword}
              className='input'
              placeholder='Confirm Password'
              type='password'
            />
          </form>
          <div className='columns paddingTop is-vcentered'>
            <div className='column is-6 alignToRight'>{load}</div>
            <div className='column is-6 alignToRight'>
              <button onClick={onSubmit} className='button is-primary'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Container>
    </AuthLayout>
  );
};
export default Signup;
