import React from "react";
import styled from "styled-components";

import { theme } from "../utils/theme";

const Container = styled.div`
  .BorderCircle {
    width: 50px;
    height: 50px;
    border: 0.5px solid ${theme.lightGrey};
    border-radius: 100px;
    transform: translateY(-0.7rem);
    margin-right: 0.2rem;
  }
  .columns {
    padding: 1rem;
  }
  .paddingLeft {
    margin-right: 1rem;
    margin-left: 0.6rem;
  }
  border-radius: 20px;
  .RedSemiCircle {
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: ${theme.primaryColor};
    transform: translate(55%, 1.4rem);
    position: absolute;
    top: 30%;
    right: 0px;
  }
  overflow: hidden;
  padding: 1rem 0rem;
  box-shadow: ${(props) => (props.noShadow ? "none" : "")};
  @media screen and (max-width: 768px) {
    margin: 0.5rem;
  }
`;

const TweetComponent = ({ noShadow, name, text }) => {
  return (
    <Container noShadow={noShadow} className='card'>
      <section className=''>
        <div className='columns'>
          <div className='column is-1 paddingLeft'>
            <div className='BorderCircle' />
          </div>
          <div className='column is-10'>
            <h1 className='title is-5'>{name}</h1>
            <h1 className='title is-6 has-text-weight-normal'>{text}</h1>
          </div>
          <div className='RedSemiCircle' />
        </div>
      </section>
    </Container>
  );
};

export default TweetComponent;
