import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/counter/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);

  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  // console.log(roomDetails?.data());
  // console.log(roomMessages);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderIcon />
            </HeaderLeft>
            <p>
              <InfoIcon /> Details
            </p>
            <HeaderRight></HeaderRight>
          </Header>

          <ChatMessage>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
          </ChatMessage>

          <ChatBottom ref={chatRef} />

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const ChatMessage = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-item: center;

  > h4 {
    display: flex;
    margin-right: 10px;
    text-transform: lowercase;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-item: center;
    font-size: 14px;

    > p > .MuiSvgIcon-root {
      margin-right: 5px !important;
      font-size: 16px;
    }
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
