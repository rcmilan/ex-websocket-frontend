import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface Props {
  joinRoom: (user: string, room: string) => Promise<void>;
}

function LobbyComponent({ joinRoom }: Props) {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Form
      className="lobby"
      onSubmit={(e) => {
        e.preventDefault();
        joinRoom(user, room);
      }}
    >
      <Form.Group>
        <Form.Control
          placeholder="name"
          onChange={(e) => setUser(e.target.value)}
        />
        <Form.Control
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        />
      </Form.Group>
      <Button
        className="full-width"
        variant="success"
        type="submit"
        disabled={!user || !room}
      >
        Join
      </Button>
    </Form>
  );
}

export default LobbyComponent;
