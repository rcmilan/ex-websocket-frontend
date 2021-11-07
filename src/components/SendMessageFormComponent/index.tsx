import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

interface Props {
  sendMessage: (message: string) => Promise<void>;
}

function SendMessageFormComponent({ sendMessage }: Props) {
  const [message, setMessage] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup>
        <FormControl
          placeholder="message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button variant="primary" type="submit">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SendMessageFormComponent;
