import React from "react";
import styled from "styled-components";

import Header from "../components/Header";
import WriteButton from "../components/WriteButton";
import TweetCard from "../components/TweetCard";
import firebase from "../firebase/config";

const Container = styled.div``;

const FeedPage = () => {
  const uid = localStorage.getItem("uid");
  React.useEffect(() => {
    firebase
      .database()
      .ref(`users/${uid}/name`)
      .once("value", (snap) => {
        localStorage.setItem("name", snap.val());
      });
  }, []);
  return (
    <Container>
      <Header selected='feed' />
      <div className='columns is-centered'>
        <div className='column is-5'>
          <WriteButton />
          <TweetCard />
        </div>
      </div>
    </Container>
  );
};
export default FeedPage;
