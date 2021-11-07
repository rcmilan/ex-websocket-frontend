import React from "react";
import { Message } from "../../Types/message";
import MessageContainerComponent from "../MessageContainerComponent";
import SendMessageFormComponent from "../SendMessageFormComponent";

interface Props {
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
}

function ChatComponent({ messages, sendMessage }: Props) {
  return (
    <div className="chat">
      <MessageContainerComponent messages={messages} />
      <SendMessageFormComponent sendMessage={sendMessage} />
    </div>
  );
}

export default ChatComponent;
