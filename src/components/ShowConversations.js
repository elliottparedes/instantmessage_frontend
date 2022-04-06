import React, { useEffect,useState, useContext, useCallback} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SocketContext } from "../context/socket";


const ShowConversations = ({deleteVisible, currentContact, setCurrentContact,token,conversationId, setConversationId}) =>
{
    const {user} = useAuth0();
    const socket= useContext(SocketContext);
    const[prevConversationId,setPrevConversationId] = useState("");
    const[conversations,setConversations] = useState([]);
   

    const handleEvents = useCallback(()=>
    {
       
        socket.on("refresh-conversations", ()=>
        {
           
           getConversations(); 
           console.log("we were supposed to refresh conversations");
        })
        socket.on("conversations",(data) =>{
        console.log("we received the getConversations post, here is the data" + data.conversationArray)
        setConversations(data.conversationArray);
        })

    })

    useEffect(()=>{
        if(token)
        getConversations();
    },[token])

    useEffect(()=>{
     
      handleEvents();

        return ()=> {
            socket.off("conversations") 
            socket.off("refresh-conversations")
        }


    },[conversations,currentContact])

    useEffect(()=>{
    console.log("the conversation id now is: " + conversationId)
    console.log("the prevConversationId is now: " + prevConversationId) 
 
    },[conversationId])

    const handleDelete = (id) =>
    {
        console.log("going to delete this conversation with id:" + id)
        socket.emit("delete-conversation",{data:id});

        setCurrentContact("No conversation selected");
        
    }

    const getConversations = async() =>
    {
        
    
        socket.emit("getConversations",{user:user.nickname})

    }
  

    const handleConversationChange = (convo) =>
    {
        console.log(convo._id); 
        setPrevConversationId(conversationId)
        setConversationId(convo._id);
        if(convo.participants[0]===user.nickname)
        setCurrentContact(convo.participants[1])
        else setCurrentContact(convo.participants[0]);
    }

    const filterArray = (arr)=>
    {   

        const filtered = arr.filter((name) => name !== user.nickname)
        
        return filtered
    }
    return(
    <div className="text-center p-2">
      
        {conversations.map((convo) => {
           return (

           <div className="btn w-100 shadow-2" onClick={() => {handleConversationChange(convo)} } key={convo.participants.toString()} style={{marginTop:"2rem", background:"grey"}}>
                {
                    <h5>{filterArray(convo.participants)}<i onClick={()=>handleDelete(convo._id)} className="btn btn-danger bi bi-trash" style={{float:"right", visibility: deleteVisible?"":"hidden"}}></i></h5> 
                }
            </div>
 
          
            
            
            ) 
            })}
    </div>)
}

export default ShowConversations;