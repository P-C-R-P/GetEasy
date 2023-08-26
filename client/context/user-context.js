import { createContext, useState, React } from 'react';

export const UserContext = createContext();

export function AppWrapper ({ children }) {
  const [itemState, setItem] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <UserContext.Provider value={{
      itemState, setItem,
      isSignedIn, setIsSignedIn
    }}>
      {
        children
      }
    </UserContext.Provider>
  );
}
