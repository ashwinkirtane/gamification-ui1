import React, { useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import Conversation from "./Conversation";
import EndModal from "./EndModal";
import Share from "./Share";
import { stepifyScript } from "./utils";
import { script } from "../chatbot";

const Container = styled.div`
  padding: 20px;
  height: 100%;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  h2 {
    color: white;
  }
`;

const Main = styled.div`
  width: 350px;
`;

const steps = stepifyScript(script);

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [conversationKey, setConversationKey] = useState(1);

  const handleEnd = () => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

  const handleHide = () => {
    setShowModal(false);
  };

  const handleRestart = () => {
    setConversationKey(count => count + 1);
    handleHide();
  };

  return (
    <Container>
      <Main>
        <Conversation {...{ steps, handleEnd, conversationKey }} />
        <br />
        <Button
          block
          onClick={() => setShowModal(true)}
          size="large"
          type="primary"
        >
          How was this built?
        </Button>
        <Share />
      </Main>
      <EndModal
        {...{
          handleHide,
          handleRestart,
          showModal
        }}
      />
    </Container>
  );
}
