import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import LobbyComponent from "./components/LobbyComponent";
import ChatComponent from "./components/ChatComponent";
import { Message } from "./types/message";

function App() {
  const [connection, setConnection] = useState<HubConnection | null>();
  const [messages, setMessages] = useState<Message[]>([]); // mensagens do chat
  const [users, setUsers] = useState<string[]>([]);

  const joinRoom = async (user: string, room: string) => {
    try {
      // Cria a conexão
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44340/chat") // definimos esse /chat no startup.cs
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      // Define Haldler ao receber mensagem
      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);

        console.log("message received", message);
      });

      // Define Haldler ao fechar a conexão
      connection.onclose((e) => {
        setConnection(null);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      // chama o método do Hub
      await connection.invoke("JoinRoom", { user, room });

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
      <h2 className="header">My Chat</h2>
      <h2 className="line" />

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
