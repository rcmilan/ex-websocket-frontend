import React from "react";

interface Props {
  users: string[];
}

function ConnectedUserComponent({ users }: Props) {
  return (
    <div className="user-list">
      <h4>Usuários online</h4>
      {users.map((u, index) => (
        <h6 key={index}>{u}</h6>
      ))}
    </div>
  );
}

export default ConnectedUserComponent;
