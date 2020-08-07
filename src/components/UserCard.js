/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";

import { theme } from "../utils/theme";
import firebase from "../firebase/config";

const Container = styled.div`
  .circle {
    width: 50px;
    height: 50px;
    border: 0.5px solid ${theme.lightGrey};
    border-radius: 100px;
  }
  h1 {
    padding-left: 2rem;
  }
  button {
    background-color: ${theme.primaryColor} !important;
    padding: 0rem 2rem;
    border-radius: 8px;
  }
  padding-bottom: 1rem;
  padding-top: 1rem;
  border: 0px solid ${theme.lightGrey};
  border-bottom-width: 1px;
`;

const UserCard = ({ name, followers, uid }) => {
  const [followed, _setFollow] = React.useState(false);
  const userID = localStorage.getItem("uid");

  React.useState(() => {
    firebase
      .database()
      .ref(`following/${userID}/${uid}`)
      .once("value", (snap) => {
        try {
          if (snap.val().name !== null) {
            _setFollow(true);
          }
        } catch {}
      });
  }, []);

  const Follow = () => {
    firebase.database().ref(`following/${userID}/${uid}`).set({ name: name });
    firebase
      .database()
      .ref(`followers/${uid}/${userID}`)
      .set({ name: localStorage.getItem("name") });
    firebase
      .database()
      .ref(`users/${uid}/followers`)
      .once("value", (snap) => {
        firebase
          .database()
          .ref(`users/${uid}/followers`)
          .set(snap.val() + 1);
      });
    firebase
      .database()
      .ref(`users/${userID}/following`)
      .once("value", (snap) => {
        firebase
          .database()
          .ref(`users/${userID}/following`)
          .set(snap.val() + 1);
      });
    _setFollow(true);
  };

  const FetchFollowers = async () => {
    const followerCount = await firebase
      .database()
      .ref(`users/${uid}/followers`)
      .once("value");
    return followerCount.val();
  };

  const [followerCounts, _setFollowerCount] = React.useState(followers);

  React.useEffect(()=>{
    async function setFollowers(){
      const followersCounted = await FetchFollowers();
      _setFollowerCount(followersCounted)
    }
   if(followerCounts===undefined){
    setFollowers()
   }
  },[])

  return (
    <Container className='columns is-vcentered'>
      <div className='column is-1'>
        <div className='circle' />
      </div>
      <div className='column is-8'>
        <h1 className='title is-5'>{name}</h1>
        {followers !== undefined ? (
          <h1 className='subtitle is-6'>Following : {followers}</h1>
        ) : (
          <h1 className='subtitle is-6'>Following : {followerCounts}</h1>
        )}
      </div>
      <div className='column is-3'>
        {followed ? (
          <h1 className='title is-6'>Following</h1>
        ) : (
          <button onClick={Follow} className='button is-primary'>
            Follow
          </button>
        )}
      </div>
    </Container>
  );
};

export default UserCard;
