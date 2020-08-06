import React from "react";
import styled from "styled-components";

import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import ProfileFeed from "../components/ProfileFeed";

const Container = styled.div``;

const ProfilePage = () => {
  return (
    <Container>
      <Header selected='profile' />
      <div className='columns is-centered'>
        <div className='column is-5'>
          <ProfileCard />
          <ProfileFeed />
        </div>
      </div>
    </Container>
  );
};
export default ProfilePage;
