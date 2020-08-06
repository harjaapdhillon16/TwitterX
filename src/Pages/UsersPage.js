import React from "react";
import styled from "styled-components";

import Header from "../components/Header";
import UserCard from "../components/UserCard";

import firebase from "../firebase/config";

const Container = styled.div`
  .paddingTop {
    padding-top: 4rem;
  }
`;

const UsersPage = () => {
  const [users, _setUsers] = React.useState([]);
  const uid = localStorage.getItem("uid");

  React.useEffect(() => {
    firebase
      .database()
      .ref(`users`)
      .once("value", (snapShot) => {
        let counter = 1;
        const data = [];
        snapShot.forEach((d) => {
          const detailsData = d.val();
          if (detailsData.uid !== uid) {
            const details = { ...detailsData };
            data.push(details);
            counter++;
          }
          if (Object.keys(snapShot.val()).length === counter) {
            _setUsers([...data]);
          }
        });
      });
  }, []);

  return (
    <Container>
      <Header selected='users' />
      <div className='columns is-centered'>
        <div className='paddingTop column is-5'>
          {users.map((item) => (
            <UserCard key={item.uid} {...item} />
          ))}
        </div>
      </div>
    </Container>
  );
};
export default UsersPage;
