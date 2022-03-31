import React, { useEffect,useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const ShowConversations = ({messages,setConversationId,conversations,conversationId,prevConversationId,setPrevConversationId,socket}) =>
{
    const {user} = useAuth0();

    useEffect(()=>{
    console.log("the conversation id now is: " + conversationId)
    console.log("the prevConversationId is now: " + prevConversationId) 
    // socket.emit("leave-room",{room:prevConversationId})
                
    // socket.emit("join-room",{room:conversationId})    
    },[conversationId])

    const filterArray = (arr)=>
    {   

        const filtered = arr.filter((name) => name !== user.nickname)

        return filtered
    }
    return(
    <div className="text-center p-2">
      
        {conversations.map((convo) => {
           return (<div onClick=
            {() => 
            {
               
                console.log(convo._id); 
                setPrevConversationId(conversationId)
                setConversationId(convo._id);

            }
            } key={convo.participants.toString()} style={{marginTop:"2rem", background:"pink"}}>{
               
                filterArray(convo.participants)
            }</div>) 
            })}
    </div>)
}

export default ShowConversations;