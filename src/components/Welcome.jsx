import React from "react";
import styled from "styled-components";
import greeting from "../assets/greeting.gif";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={greeting} alt="greeting" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffadbc;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #a180ff;
  }
`;
