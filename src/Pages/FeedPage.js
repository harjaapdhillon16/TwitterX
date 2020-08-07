/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WriteButton from "../components/WriteButton";
import TweetCard from "../components/TweetCard";
import firebase from "../firebase/config";
import { theme } from "../utils/theme";

const Container = styled.div`
  .marginBottom {
    margin-bottom: 1rem;
  }
  .logoutButton {
    background-color: ${theme.primaryColor} !important;
    padding: 0rem 2rem;
    position: fixed;
    bottom: 2px;
    right: 5px;
  }
`;

const FeedPage = () => {
  const [feedPosts, _setFeedPosts] = React.useState([]);

  const history = useHistory();

  const uid = localStorage.getItem("uid");
  React.useEffect(() => {
    firebase
      .database()
      .ref(`users/${uid}/name`)
      .once("value", (snap) => {
        localStorage.setItem("name", snap.val());
      });
  }, []);

  React.useEffect(() => {
    firebase
      .database()
      .ref(`following/${uid}`)
      .once("value", (snap) => {
        const followingArray = [];
        let counter = 0;
        snap.forEach((data) => {
          followingArray.push(data.ref.key);
          counter += 1;
          if (Object.keys(snap.val()).length === counter) {
            FetchPosts(followingArray);
          }
        });
      });
  }, []);

  function FetchPosts(val) {
    const db = firebase.database().ref(`feed`);
    db.orderByChild("time").once("value", (snap) => {
      const feedData = [];
      let counter = 0;
      snap.forEach((data) => {
        counter++;
        if (val.includes(data.val().uid)) {
          feedData.push(data.val());
        }
        if (Object.keys(snap.val()).length === counter) {
          feedData.reverse();
          _setFeedPosts([...feedData]);
        }
      });
    });
  }

  const Logout = () => {
    localStorage.removeItem("uid");
    firebase.auth().signOut();
    history.push("/");
  };

  return (
    <Container>
      <Header selected='feed' />
      <div className='columns is-centered'>
        <div className='column is-5'>
          <WriteButton />
          {feedPosts.map((item) => (
            <div className='marginBottom'>
              <TweetCard key={item.uid} {...item} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={Logout} className='button is-primary logoutButton'>Logout</button>
    </Container>
  );
};
export default FeedPage;
