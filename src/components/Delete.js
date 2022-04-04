import React from "react";


const Delete = ({setDeleteVisible, deleteVisible}) => {
 

  

  
    const handleDelete=()=> 
    {
        setDeleteVisible(!deleteVisible);
        console.log("flipping the delete button");
    }


  return (
   
      <div>
         <i onClick={handleDelete} className="btn bi bi-trash"></i>
      </div>
      
  )
  
};

export default Delete;

