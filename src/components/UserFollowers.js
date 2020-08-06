import React from "react";
import styled from "styled-components";

import UserCard from "./UserCard";
import firebase from "../firebase/config";

const Container = styled.div``;

const UserFollowers = () => {
  const [followerList, _setFollowerList] = React.useState([]);
  const uid = localStorage.getItem('uid')
  React.useEffect(() => {
    firebase
      .database()
      .ref(`followers/${uid}`)
      .once("value", (snap) => {
        const list = [];
        let counter = 1;
        snap.forEach((data) => {
          const details = data.val();
          details.uid = data.ref.key;
          list.push(details);
          if (Object.keys(snap.val()).length === counter) {
            _setFollowerList([...list]);
          }
          counter++;
        });
      });
  }, []);
  return (
    <Container>
      {followerList.map((item) => (
        <UserCard key={item.uid} {...item} />
      ))}
    </Container>
  );
};
export default UserFollowers;
