import React, { useState, useContext, useCallback } from "react";

import Modal from 'react-bootstrap/Modal'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

import { SocketContext } from "../context/socket";


const Compose = ( {token}) => {
    const socket = useContext(SocketContext);
    const { user } = useAuth0();
    const sendEmit = useCallback((participants)=>{
        socket.emit("notify-participants",{participants: participants});
    })
    const createConversation = useCallback((participants) =>{
        socket.emit("create-conversation",{participants:participants});
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => 
    {
        setShow(true);
    }


    const startConversation = async (participants) =>
    {
        try {   
                 await createConversation(participants)
                .then((res)=> {
                    console.log(res.data);
                    sendEmit(participants);
                    
                })

                
            

        }catch (error)
        {
            console.log(error);
        }

    }

    return (
        <>
      
        <i onClick={ handleShow}className="btn bi bi-pencil-square"></i>
            
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Start a new conversation</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                   <form onSubmit={(event)=> {
                       event.preventDefault();
                       startConversation([user.nickname, event.target.recipient.value]);
                       handleClose();
                    }}>
                    <input name="recipient" type="text" placeholder="recipient">
                    </input> 
                    {/* <input name="message" type="text" placeholder="message">
                    </input> */}
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                    </form>
                </Modal.Body>
             
      </Modal>


       </>
    )
}
export default Compose;