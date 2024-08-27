import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  username: "Guest",
  setUsername: () => {},
});

export function UserProvider({ children }) {
  const [username, setUsername] = useState("Guest");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
