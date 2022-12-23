import React from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { logout } from "../../slices/accountSlice";
import { GoogleLogout } from 'react-google-login';
const Profile = () => {
  const currentUser = useSelector((state) => state.account.user);
  const dispatch = useDispatch()
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
        Profile <strong>{currentUser.username}</strong> 
        </h3>
      </header>
      <p>
        {/* <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)} */}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.api &&
          currentUser.api.map((server, index) => <li key={index}>{JSON.stringify(server)}</li>)}
      </ul>
      <Button
        onClick={() => {dispatch(logout())}}
      >Log out</Button>

      {/* <GoogleLogout
        clientId='404409424650-a1hh4j6m9r3998v16siia2lum9un21ip.apps.googleusercontent.com'
        buttonText="Logout"
        onLogoutSuccess={logout}
      >Log Out
      </GoogleLogout> */}
    </div>
  );
};

export default Profile;