import React from "react";
import "./navbar.css";

const Navbar =()=>
{

    return(
        <>
        <div className="navbar" style={{height:"2.5rem"}}>
        <a href="" ><i className="fa-solid fa-trash"></i></a>
        <a href=""><i className="fa-solid fa-plus"></i></a>
        <a href="/profile"><i className="fa-solid fa-user"></i></a>
        </div>
        
        </>
    )

}

export default Navbar;