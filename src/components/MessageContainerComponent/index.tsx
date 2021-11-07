import React, { useEffect, useRef } from "react";
import { Message } from "../../types/message";

interface Props {
  messages: Message[];
}

function MessageContainerComponent({ messages }: Props) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={messageRef} className="message-container">
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
