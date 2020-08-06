import React from "react";
import styled from "styled-components";

import firebase from "../firebase/config";
import TweetCard from "./TweetCard";

const Container = styled.div``;

const UserPostFeed = () => {
  const [name, _setName] = React.useState("name");
  const [posts, _setPosts] = React.useState([]);

  const uid = localStorage.getItem("uid");

  React.useEffect(() => {
    firebase
      .database()
      .ref(`posts/${uid}`)
      .orderByKey()
      .once("value", (snap) => {
        let counter = 1;
        const arrayData = [];
        snap.forEach((data) => {
          const details = data.val();
          arrayData.push(details);
          if (Object.keys(snap.val()).length === counter) {
            _setPosts([...arrayData]);
          }
          counter++;
        });
      });
  }, []);
  React.useEffect(() => {
    firebase
      .database()
      .ref(`users/${uid}/name`)
      .once("value", (snap) => {
        _setName(snap.val());
      });
  }, []);

  return (
    <Container>
      {posts.map((item, index) => (
        <TweetCard key={index} name={name} {...item} noShadow />
      ))}
    </Container>
  );
};
export default UserPostFeed;
