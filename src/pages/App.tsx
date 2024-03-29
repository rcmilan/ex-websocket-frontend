import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Message } from "../types/message";
import LobbyComponent from "../components/LobbyComponent";
import ChatComponent from "../components/ChatComponent";
import { UserRoom } from "../types/userRoom";

const _chatHubEndpoint = `${process.env.REACT_APP_BACKEND}/${process.env.REACT_APP_WEBSOCKET_HUB_CHAT}`;

function App() {
  const [connection, setConnection] = useState<HubConnection | null>();
  const [messages, setMessages] = useState<Message[]>([]); // mensagens do chat
  const [users, setUsers] = useState<string[]>([]); // usuários logados

  // Entra na sala (Group)
  const joinRoom = async (userRoom: UserRoom) => {
    try {
      // cria conexão
      const connection = new HubConnectionBuilder()
        .withUrl(_chatHubEndpoint) // definimos esse hub no startup.cs
        .configureLogging(LogLevel.Information)
        .build();

      // Handler para método iniciado pelo backend
      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      // Handler para método iniciado pelo backend
      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);

        console.log("message received", message);
      });

      // Handler para método iniciado pelo backend
      connection.onclose((e) => {
        setConnection(null);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();

      // chama o método do Hub
      await connection.invoke("JoinRoom", userRoom);

      setConnection(connection);
    } catch (error) {
      console.error(error);
    }
  };

  const closeConnection = async () => {
    try {
      await connection?.stop();
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      // chama o método do Hub
      message && connection?.invoke("SendMessage", message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h2 className="header">WebSocket Chat Room</h2>
      <hr className="line" />
      {!connection ? (
        <LobbyComponent joinRoom={joinRoom} />
      ) : (
        <ChatComponent
          messages={messages}
          sendMessage={sendMessage}
          closeConnection={closeConnection}
          users={users}
        />
      )}
    </div>
  );
}

export default App;
