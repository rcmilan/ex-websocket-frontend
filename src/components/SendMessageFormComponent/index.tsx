import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { Form, FormControl, Button } from "react-bootstrap";

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
        ></FormControl>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SendMessageFormComponent;
