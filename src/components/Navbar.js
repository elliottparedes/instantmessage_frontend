
import "./navbar.css";
import axios from 'axios'
import Modal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";


const Navbar =({token})=>
{


    const {user} = useAuth0();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [participants, setParticipants] = useState([]);
    const [person,setPerson]=useState("");
  
  
    const addNewConversation = async(event) =>
    {
        event.preventDefault();
        // console.log(event.target.name.value)
       setPerson(event.target.name.value);
        console.log(event.target.name.value)
        console.log(person)
        setParticipants(participants.concat(person));

        console.log(participants)
        try{
            console.log(user.nickname);
            setParticipants( participants.concat(user.nickname));
            console.log("this is what is in the participants array" + participants)
            // await axios.post("http://localhost:3000/createConversation",{
            //     participants:participants
            // }, {
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     }
            //                  }      
            //                  ).then((res)=> {
            //                      console.log(res.data);
                                 
                                
            //                  }) 
                   }catch(err) {
                       console.log(err);
                   }
    }

    return(
        <>
        <div className="row" style={{height:"2.5rem"}}>
        <div className ="col">
             <a href="" ><i className="fa-solid fa-trash"></i></a>
        </div>
        <div className="col">
            <button className="btn btn-primary" href=""><i className="fa-solid fa-plus"></i></button>
        </div>
       <div className="col">
            <a href="/profile"><i className="fa-solid fa-user"></i></a>
       </div>
       
        </div>


     
        </>
    )

}

export default Navbar;