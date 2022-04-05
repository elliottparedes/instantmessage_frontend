import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Profile from './pages/Profile'

import { Auth0Provider } from "@auth0/auth0-react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


ReactDOM.render(
 
 <BrowserRouter>
  <Auth0Provider
        domain="dev-gy1a3e07.us.auth0.com"
        clientId="x6QAJZOtPH6UR4X3kR9hJ3Ge3XkANdde"
        redirectUri="https://joyful-queijadas-e7e56b.netlify.app/"
        audience='https://instantmessengerbackend.herokuapp.com/'
        scope='openid profile email'
        

  >
    
      <Routes>
        <Route path ="/" element={<App/ >} />
        <Route path = "profile" element={<Profile />} />
      </Routes>
   
    
  </Auth0Provider> </BrowserRouter>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

