
import './Main.css';
import Spinner from './components/Spinner';
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Chatbox from './components/Chatbox';
//  import { io } from "socket.io-client";
//  const socket = io("http://localhost:3000/", {withCredentials: false});
import {socket,SocketContext} from './context/socket';

function App() {

   const { loginWithPopup,  isAuthenticated, isLoading } = useAuth0();

 
  if (isLoading) {
    return <Spinner />
  }

  if (isAuthenticated) {
    return (
       <SocketContext.Provider value={socket}>
         <Chatbox />
       </SocketContext.Provider>
       
      
    );
  }
  else {
    loginWithPopup();

  }


}


export default App;
