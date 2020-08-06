import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { theme } from "../utils/theme";

const Nav = styled.nav`

  .header {
    color: ${theme.primaryColor};
    margin-top: -0.4rem;
    padding:1rem;
    padding-left: 4rem;
  }
  .columns {
    padding-right: 10rem;
    padding-top:1rem;
  }
  .feed {
    color: ${(props) => (props.selected === "feed" ? theme.primaryColor : theme.lightGrey)};
  }
  .users {
    color: ${(props) => (props.selected === "users" ? theme.primaryColor : theme.lightGrey)};
  }
  .profile {
    color: ${(props) => (props.selected === "profile" ? theme.primaryColor : theme.lightGrey)};
  }
`;

const Header = ({ selected }) => {
  return (
    <Nav
      selected={selected}
      className='navbar card'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <h1 className='title is-3 header'>TweetX</h1>
      </div>

      <div className='navbar-menu'>
        <div className='navbar-end'>
          <div className='columns '>
            <div className='column is-4'>
              <Link to='/feed'>
                <h1 className='title is-5 feed'>Feed</h1>
              </Link>
            </div>
            <div className='column is-4'>
              <Link to='/users'>
                <h1 className='title is-5 users'>Users</h1>
              </Link>
            </div>
            <div className='column is-5'>
              <Link to='/profile'>
                <h1 className='title is-5 profile'>Profile</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
};
export default Header;
