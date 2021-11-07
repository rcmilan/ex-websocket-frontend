import React from "react";
import { Message } from "../../Types/message";

interface Props {
  messages: Message[];
}

function MessageContainerComponent({ messages }: Props) {
  return (
    <div className="message-container">
      {messages.map((m, index) => (
        <div key={index} className="user-message">
          <div className="message bg-primary">{m.message}</div>
          <div className="from-user">{m.user}</div>
        </div>
      ))}
    </div>
  );
}

export default MessageContainerComponent;
