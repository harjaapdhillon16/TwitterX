import React from "react";
import styled from "styled-components";

import { theme } from "../utils/theme";
import firebase from "../firebase/config";

const Container = styled.div`
  padding-top: 2rem;
  .button {
    background-color: ${theme.primaryColor} !important;
    padding: 0rem 2.5rem;
  }
  textarea {
    background-color: ${theme.inputBackgroundColor};
    margin-top: 10px;
  }
  .alignRight {
    text-align: right;
  }
  .columns {
    padding-top: 0.5rem;
  }
  padding-bottom: 2rem;
`;

const WriteButton = () => {
  const [writeMode, _setWriteMode] = React.useState(false);
  const [text, _setText] = React.useState("");
  const Post = () => {
    const uid = localStorage.getItem("uid");
    if (text !== "") {
      firebase.database().ref(`posts/${uid}`).push({ time: Date.now(), text });
      firebase
        .database()
        .ref(`feed/`)
        .push({
          uid,
          time: Date.now(),
          text,
          name: localStorage.getItem("name"),
        });
      _setText("");
      _setWriteMode(false);
    }
    firebase
      .database()
      .ref(`users/${uid}/posts`)
      .once("value", (snap) => {
        firebase
          .database()
          .ref(`users/${uid}/posts`)
          .set(snap.val() + 1);
      });
  };
  return (
    <Container>
      {writeMode ? (
        <>
          <textarea
            value={text}
            onChange={(event) => _setText(event.target.value)}
            className='textarea'
          />
          <div className='columns is-mobile'>
            <div className='column is-6'>
              <button
                onClick={() => _setWriteMode(false)}
                className='button is-primary'
              >
                Cancel
              </button>
            </div>
            <div className='column is-6 alignRight'>
              <button onClick={Post} className='button is-primary'>
                Post
              </button>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={() => {
            _setWriteMode(true);
            _setText("");
          }}
          className='button is-primary'
        >
          Write
        </button>
      )}
    </Container>
  );
};

export default WriteButton;
