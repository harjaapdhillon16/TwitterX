import React from "react";
import styled from "styled-components";

import UserCard from "./UserCard";
import firebase from "../firebase/config";

const Container = styled.div``;

const UserFollowing = () => {
  const uid = localStorage.getItem("uid");

  const [followingList, _setFollowingList] = React.useState([]);
  React.useEffect(() => {
    firebase
      .database()
      .ref(`following/${uid}`)
      .once("value", (snap) => {
        const list = [];
        let counter = 1;
        snap.forEach((data) => {
          const details = data.val();
          details.uid = data.ref.key;
          list.push(details);
          if (Object.keys(snap.val()).length === counter) {
            _setFollowingList([...list]);
          }
          counter++;
        });
      });
  }, []);

  return (
    <Container>
      {followingList.map((item) => (
        <UserCard key={item.uid} {...item} />
      ))}
    </Container>
  );
};
export default UserFollowing;
