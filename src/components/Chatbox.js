import { Navigate } from 'react-router-dom';

import './Chatbox.css';

import Compose from './Compose';
import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ShowConversations from './ShowConversations';
import ShowMessages from './ShowMessages';
import Delete from './Delete';
import {SocketContext} from '../context/socket';


const Chatbox = () => 
{

    const socket= useContext(SocketContext);
    const { user, getAccessTokenSilently } = useAuth0();
    
    const [token, setToken] = useState(0);
    
  
    
    
    const[redirectToProfile,setRedirectToProfile] = useState(false);
   
    const [currentContact, setCurrentContact] = useState("No Conversation Selected");
    const [conversationId, setConversationId] = useState("");
    const [deleteVisible,setDeleteVisible] = useState(false);
  
    useEffect(()=>{

    },[currentContact])
 
    
    useEffect(()=>{

    
          socket.on('room-joined',(message)=>{console.log(message)});
          // socket.on('refresh-conversations', ()=>{
          // console.log("the refersh conversatoin event came in")
        
            return () =>{
        // socket.off("refresh-conversations")
        socket.off('room-joined')
        socket.off("conversations")
      } 
        
      },[])    
    

    useEffect(() => {
    
        getToken()
    
        if(token)
        {
            socket.emit('join-room', {room: user.nickname});
        }
        
         
      }, [token])

 

   

   

   
    const getToken = async () => 
    {
       
        try {
          const accessToken = await getAccessTokenSilently({
            audience: `https://instantmessengerbackend.herokuapp.com/`,
            scope: "read:current_user"
          })
          setToken(accessToken);
          console.log(token);
        } catch (err) { console.log(err) }
    }

  

    
    const sendMessage = (event) =>
  {

    
    event.preventDefault();
     socket.emit("send-message", event.target.message.value,conversationId,user.nickname);
    event.target.message.value="";
    //  setAlert(alert+1);
  }


    if(redirectToProfile)
    return <Navigate to="/profile" />

  
      return(
    
    <div className="conatiner-fluid" style={{backgroundColor: "white", height:"100vh"}}>
          <div className="card center p-0 m-0 border-none" style={{backgroundColor:"white", width:"800px"}}>
            <div className="row">
              <div className="col-sm-4" style={{backgroundColor:"white"}}>
                <div className="row border-1" style={{height:"3rem"}}>
                  <div className="col nav">
                    <li onClick={()=>setRedirectToProfile(true)}><i className="btn bi bi-file-earmark-person"></i></li>
                    
                    <li> <Delete setDeleteVisible={setDeleteVisible} deleteVisible={deleteVisible} /> </li>
                 
                    <li> <Compose token={token}  /></li>
                  </div>
                </div>
                <div className="row" style={{height:"20rem"}}>
                  <div className="col scroll border border-3" style={{height:"100%"}}>
                    <ShowConversations currentContact={currentContact} deleteVisible={deleteVisible} setCurrentContact={setCurrentContact} token={token} setConversationId={setConversationId} conversationId={conversationId}/>
                  </div>
                </div>
      
                <div>
                  
      
                </div>
              </div> 
              <div className="col-sm-8">
                <div className="row w-100" style={{backgroundColor:"#ea5323", height:"3rem"}}>
                    <div className="col text-center">
                        <h5 className="mt-3">{currentContact}</h5>
                    </div>
                </div>
                <div className="row w-100" style={{height:"17rem", backgroundColor:"white"}}>
                    <div className="col scroll" style={{height:"100%"}}>    
                        
                         {/* <button className="btn btn-primary" onClick={()=> socket.emit("getConversations",{user:user.nickname})}>submit</button> */}
                          <ShowMessages conversationId={conversationId}/>
                    </div>

                </div>
                <div className="row w-100" style={{height:"3rem", backgroundColor:"white"}}>
                    <div className="col p-0">
                        <form className="w-100" onSubmit={(event)=>sendMessage(event) }>
                            <div className="input-group mb-3 w-100">
                                <input name="message" type="text"style={{height:"3rem"}} className="form-control" placeholder="message" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                              <button type="submit" className="btn btn-primary"><i className="bi bi-arrow-right-circle-fill"></i></button>
                              </div>
                          </form>
                    </div>
                </div>
              </div>
            </div>
    
        </div>
    
    </div>
    
    )
   


} 
export default Chatbox;