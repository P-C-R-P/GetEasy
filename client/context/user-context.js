import { createContext, useState } from 'react';
import apiService from '../utils/api-service';

export const UserContext = createContext();

export function AppWrapper({ children }) {

  const [itemState, setItem] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(async () => {
    await apiService.checkUser().then( data => {
     setIsSignedIn(data);
    }).catch( _ => setIsSignedIn(false));
  })
  
  return (
    <UserContext.Provider value={ { 
      itemState, setItem,
      isSignedIn, setIsSignedIn
      }}>
      {
        children
      }
    </UserContext.Provider>
  );
}

