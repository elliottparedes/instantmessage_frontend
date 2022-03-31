import React, { useEffect,useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const ShowMessages = ({conversationId,prevConversationId,token, setMessages,messages,socket,alert}) =>
{
    const {user}= useAuth0;

    
   useEffect(()=>{

    // join();
    // leave();
    // socket.emit("leave-room",{room:prevConversationId})
                
    //             socket.emit("join-room",{room:conversationId})
   
    getMessages();
   },[alert])

    useEffect(async ()=>{
        if(prevConversationId ==="")
        {
             
            // socket.emit("leave-room",{room:prevConversationId})
        }
        // socket.emit("join-room",{room:conversationId})
       
        getMessages();
                       
       socket.emit("leave-room",{room:prevConversationId})         
      socket.emit("join-room",{room:conversationId})  
       

    },[conversationId])

//     socket.on('message-received', (message1)=>
//   {
//     // setMessages(messages.concat(message.message));
//     setMessages(messages.concat(message1.body))
//     console.log("we need to update the dom with the new message now")
//   })
    const getMessages =async () =>
    {
        if(conversationId !=="")
        try{
            await axios.post("http://localhost:3000/getMessages",{
                id:conversationId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                             }      
                             ).then((res)=> {
                                 console.log(res.data);
                                 setMessages(res.data);
                                
                             }) 
                   }catch(err) {
                       console.log(err);
                   }

    }

    return(
    <div className="imessage" style={{overflowY:"auto", display:"flex"}}>
      {messages.map((message)=>{
         return <p className={message.sender===user?"from-me":"from-them"} key={message.body}>{message.body}</p>
      })}
       
    </div>)
}


export default ShowMessages;