import React from "react";
import { Button } from "react-bootstrap";
import { Message } from "../../types/message";
import ConnectedUserComponent from "../ConnectedUserComponent";
import MessageContainerComponent from "../MessageContainerComponent";
import SendMessageFormComponent from "../SendMessageFormComponent";

interface Props {
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
  closeConnection: () => Promise<void>;
  users: string[];
}

function ChatComponent({
  messages,
  sendMessage,
  closeConnection,
  users,
}: Props) {
  return (
    <div>
      <div className="leave-room">
        <Button
          variant="danger"
          onClick={() => {
            closeConnection();
          }}
        >
          Leave
        </Button>
      </div>
      <ConnectedUserComponent users={users} />
      <div className="chat">
        <MessageContainerComponent messages={messages} />
        <SendMessageFormComponent sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatComponent;
