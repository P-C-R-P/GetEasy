import { createContext, useState } from 'react';
import apiService from '../utils/api-service';

export const UserContext = createContext();

export function AppWrapper({ children }) {

  const [itemState, setItem] = useState({});
  const [isSignedin, setIsSignedin] = useState(async () => {
    await apiService.checkUser().then( data => {
     setIsSignedin(data);
    }).catch( _ => setIsSignedin(false));
  })
  
  return (
    <UserContext.Provider value={ { 
      itemState, setItem,
      isSignedin, setIsSignedin
      }}>
      {
        children
      }
    </UserContext.Provider>
  );
}

