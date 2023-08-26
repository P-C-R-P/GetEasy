import { createContext, useState, React } from 'react';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export function AppWrapper ({ children }) {
  const [itemState, setItem] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        itemState,
        setItem,
        isSignedIn,
        setIsSignedIn
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
