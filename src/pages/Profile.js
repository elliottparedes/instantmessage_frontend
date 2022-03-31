import React, { useEffect,useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from 'axios';
import LogoutButton from "../components/LogoutButton";
import "../Main.css"
import Spinner from "../components/Spinner";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, withAuthenticationRequired } = useAuth0();
  const [token,setToken] = useState(0)
  

  const getToken = async() => 
  {

  const domain = "dev-gy1a3e07.us.auth0.com";
  try {
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user"
    })
    console.log("the access token is" + accessToken)
 
    
    setToken(accessToken);
    console.log("the value of token in the getToken method is:" + token);
  } catch (err) {console.log(err)}
}

  useEffect(()=>{
    getToken();
  },[])

  if (isLoading) {
    return <Spinner />;
  }


const sendMessage = async() =>
{
  console.log("Request was sent with this value of token: "+ token)

    const res = await axios.post("http://localhost:3000/sendMessage", {message:"helllo from react secured"},{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then(console.log(res))
}

  return (
    isAuthenticated && (
      <div className="card center" style={{}}>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {/* <button onClick={sendMessage}> send meee</button> */}
        <LogoutButton/>
      </div>
    )
  );
};

export default withAuthenticationRequired (Profile, {
  onRedirecting: () => <Spinner />,
});

