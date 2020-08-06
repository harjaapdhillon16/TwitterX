import React from "react";
import styled from "styled-components";

import { theme } from "../utils/theme";
import firebase from "../firebase/config";

const Container = styled.div`
  padding-top: 3rem;
  .circle {
    height: 100px;
    width: 100px;
    border: 2px solid ${theme.lightGrey};
    border-radius: 100px;
  }
  .pullUp {
    transform: translateY(-1.8rem);
  }
  .column .is-6 {
    color: ${theme.lightGrey} !important;
  }
`;

const ProfileCard = () => {
  const [values, _setValues] = React.useState({
    name: "",
    followers: "",
    posts: "",
    following: "",
  });

  React.useEffect(() => {
    const uid = localStorage.getItem("uid");
    firebase
      .database()
      .ref(`users/${uid}`)
      .once("value", (data) => {
        const details = data.val();
        _setValues({
          name: details.name,
          followers: details.followers,
          posts: details.posts,
          following: details.following,
        });
      });
  }, []);

  return (
    <Container>
      <div className='columns is-vcentered'>
        <div className='column is-4'>
          <div className='circle' />
        </div>
        <div className='column is-7'>
          <h1 className='title is-4'>{values.name}</h1>
        </div>
      </div>
      <div className='columns pullUp'>
        <div className='column is-4' />
        <div className='column is-8'>
          <div className='columns is-gapless'>
            <div className='column is-3'>
              <h1 className='subtitle is-6'>Posts : {values.posts}</h1>
            </div>
            <div className='column is-4'>
              <h1 className='subtitle is-6'>Followers : {values.followers}</h1>
            </div>
            <div className='column is-4'>
              <h1 className='subtitle is-6'>Following : {values.following}</h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ProfileCard;
