import React from 'react';
import {io} from "socket.io-client"; 

export const socket = io("https://instantmessengerbackend.herokuapp.com/", {transports:['websocket'],withCredentials: false});
export const SocketContext = React.createContext();


