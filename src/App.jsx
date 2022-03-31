import axios from 'axios';
import './Main.css';
import Spinner from './components/Spinner';
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import ShowConversations from './components/ShowConversations';
import ShowMessages from './components/ShowMessages';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000/", {withCredentials: false});

function App() {

  const { loginWithRedirect, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [response, setResponse] = useState("");
  const [token, setToken] = useState(0);
  const[conversations,setConversations] = useState([]);
  const[messages,setMessages] = useState([]);
  const[conversationId,setConversationId]= useState("");
  const[prevConversationId,setPrevConversationId] = useState("");
  const[alert,setAlert]=useState(1);
 


  const getToken = async () => {
    const domain = "dev-gy1a3e07.us.auth0.com";
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user"
      })
      // console.log("the access token is" + accessToken)
      setToken(accessToken);
      console.log(token);
    } catch (err) { console.log(err) }
  }

  const getConversations = async() =>
  {
      
       await axios.post("http://localhost:3000/getConversations",{
          participant:"elliottparedes"
      }, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }).then((res)=> {
          console.log(res.data);
          setConversations(res.data);
      })
  }

  useEffect(() => {
    
    getToken()

    if(token)
    {
      getConversations();
   
    }
    
     
  }, [token])


  socket.on('message-confirmation',(confirmationMessage)=>{
    console.log(confirmationMessage.message);
  });

  socket.on('message-received', (message)=>
  {
    setAlert(alert+1);
    // setMessages(messages.concat(message.message));
    
   
    
  })

  // socket.on('message-saved',(message) => {
  //   console.log("the message was saved successfully into database and it said:" + message)
  // });

  socket.on('room-joined',(message)=>{console.log(message)});

  // socket.on('left-room', (message)=> {console.log(message.message)});
 

  const sendMessage = (event) =>
  {
    event.preventDefault();
    //  room # (which is also the conversation _id, from the current user), 
     socket.emit("send-message", event.target.message.value,conversationId,user.nickname);
    event.target.message.value="";
  }
 
  if (isLoading) {
    return <Spinner />
  }

  if (isAuthenticated) {
    return (
      <div className="container" style={{ width: "100%", height: "100vh"}}>
        <div className="card center w-75" style={{height:"25rem"}}>
          <div className="row" style={{height:"30rem"}}>
            <div className="col lime" style={{ borderTopLeftRadius: "25px" }}>
              <ShowConversations messages={messages} conversations={conversations} prevConversationId={prevConversationId} setPrevConversationId={setPrevConversationId} setConversationId={setConversationId} conversationId={conversationId} socket={socket} />
            </div>
            <div className="col red" style={{ borderTopRightRadius: "25px" }}>
            <div className="row" style={{height:"20rem",overflowY:"auto",display:"flex"}} >
              <div className="col">
                <ShowMessages conversationId={conversationId} prevConversationId={prevConversationId} setPrevConversationId={setPrevConversationId} setConversationId={setConversationId} token={token} setMessages = {setMessages} messages={messages} socket={socket} alert={alert} />
               
              </div>
            </div>

            <div className="row gx-0 align-items-end" style={{height:"5rem"}}>
              <div className="col h-100">
              <form onSubmit={(event)=>sendMessage(event)} >
                <div className="input-group mb-3">
                <input type="text" required className="form-control h-100" name="message" style={{borderRadius:"0"}} placeholder="message" aria-label="message" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                <button  className="btn btn-primary" style={{borderRadius:"0"}} type="submit"><i className="fa fa-telegram"/></button>
                </div>
                </div>
              </form>
              </div>
            </div>
            </div>

          </div>
          <div className="row" style={{}}>

            <Navbar />
          </div>

        </div>
      </div>
    );
  }
  else {
    loginWithRedirect();

  }


}


export default App;
