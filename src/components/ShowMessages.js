import React, { useEffect,useState, useContext, useCallback} from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { SocketContext } from "../context/socket";

const ShowMessages = ({conversationId,prevConversationId}) =>
{
    const {user}= useAuth0;
    const socket= useContext(SocketContext);

    const[messages,setMessages] = useState([]);
    
   const getMessages= useCallback((id)=> {
    socket.emit("getMessages",{id:id})
   })

   const handleEvents =useCallback(()=>{
        // this makes sure that react doesnt make any more socket listenrers when we udpate
    socket.on("messages", (data)=>{
        if(data.messageArray);
        setMessages(data.messageArray);
        console.log("received get messages ping");
    })
    socket.on("message-received", (data)=>{getMessages(conversationId)})
   })

  


   useEffect(()=>{
    
    handleEvents();

    return ()=>
     {
        socket.off("messages")
        socket.off("message-received")
    }
   },[messages])

    useEffect( ()=>{
    
                 
    socket.emit("leave-room",{room:prevConversationId})         
    socket.emit("join-room",{room:conversationId})  
      getMessages(conversationId);   

    },[conversationId])


    // const getMessages = (id) =>
    // {
    //     socket.emit("getMessages",{id:id})
  

    // }

    return(
    <div className="imessage" style={{overflowY:"auto", display:"flex"}}>
      {messages.map((message)=>{
          console.log("message has this" + message)
          console.log(user)
         return <p className={message.sender === user ?"from-me":"from-them"} key={message.body}>{message.body}</p>
      })}
       
    </div>)
}


export default ShowMessages;