import React from "react";
import styled from "styled-components";

import { theme } from "../utils/theme";
import UserPostFeed from "./UserPostFeed";
import UserFollowing from "./UserFollowing";
import UserFollowers from "./UserFollowers";

const Container = styled.div`
  margin-top: 2rem;
  border: 0px solid ${theme.lightGrey};
  border-top-width: 3px;
  .borderDiv {
    border: 0px solid ${theme.black};
    transform: translateY(-0.1rem);
  }
  .post {
    border-top-width: ${(props) =>
      props.selectedFeed === "post" ? "3px" : ""};
  }
  .followers {
    border-top-width: ${(props) =>
      props.selectedFeed === "followers" ? "3px" : ""};
  }
  .following {
    border-top-width: ${(props) =>
      props.selectedFeed === "following" ? "3px" : ""};
  }
`;

const ProfileFeed = () => {
  const [selectedFeed, _setSelectedFeed] = React.useState("post");

  const FeedToBeShown = () => {
    switch (selectedFeed) {
      case "post":
        return <UserPostFeed />;
      case "following":
        return <UserFollowing />;
      case "followers":
        return <UserFollowers />;
      default:
        return <UserPostFeed />;
    }
  };

  return (
    <>
      <Container
        selectedFeed={selectedFeed}
        className='columns is-centered has-text-centered'
      >
        <div
          onClick={() => _setSelectedFeed("post")}
          className='column is-3 post borderDiv'
        >
          <h2 className='title is-5 headings'>Post</h2>
        </div>
        <div
          onClick={() => _setSelectedFeed("followers")}
          className='column is-3 followers borderDiv'
        >
          <h2 className='title is-5 headings'>Followers</h2>
        </div>
        <div
          onClick={() => _setSelectedFeed("following")}
          className='column is-3 following borderDiv'
        >
          <h2 className='title is-5 headings'>Following</h2>
        </div>
      </Container>
      {FeedToBeShown()}
    </>
  );
};
export default ProfileFeed;
