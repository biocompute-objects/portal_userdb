import React, { useEffect }  from "react";
import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AccountPage from "./components/account";
import About from "./pages/About.js";
import BcoDbs from "./pages/Bcodbs.js";
import BcoViewer from "./components/viewer";
import BuilderColorCode from "./components/builder";
import HomePage from "./pages/Home.js"
import Login from "./components/auth/Login";
import MainLayout from "./layouts/MainLayout";
import ObjectViewLayout from "./layouts/ObjectViewLayout";
import PasswordReset from "./components/auth/PasswordReset";
import Prefix from "./components/prefix";
import Register from "./components/auth/Register";
import Resources from "./pages/Resources.js";
import { jwtDecode } from "jwt-decode";
import { handleExpiredJWT } from "./slices/accountSlice";
import { setMessage } from "./slices/messageSlice.js";

function setupTokenExpirationAlert(expirationTime, onExpireCallback) {
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  const timeUntilExpiration = expirationTime - currentTime; // Time until expiration in seconds

  if (timeUntilExpiration > 0) {
    // Set a timeout to call the onExpireCallback after the calculated delay in milliseconds
    setTimeout(onExpireCallback, timeUntilExpiration * 1000);
  } else {
    // If the token is already expired or the time is negative, call the callback immediately
    onExpireCallback();
  }
}

export default function Router() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setupTokenExpirationAlert(decoded.exp, () => {
        navigate("/login")
        dispatch(handleExpiredJWT())
          .unwrap()
          .then((response) => {
            console.log(response)
            dispatch(setMessage("JW Token Expired. Please log in again"))
          })
      });
    }
    
    return () => clearTimeout(setupTokenExpirationAlert);
  }, [token, isLoggedIn]);

  let element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "profile", element: isLoggedIn ? <AccountPage /> : <Navigate to="/login" replace />},
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "resources", element: <Resources /> },
        { path: "bcodbs", element: <BcoDbs />},
        { path: "prefix", element: <Prefix />},
        { path: "about", element: <About />},
        { path: "password/confirm", element: <PasswordReset />},
      ]
    },
    {
      path: "/",
      element: <ObjectViewLayout />,
      children: [
        { path: "builder", element: <BuilderColorCode /> },
        { path: "viewer", element: <BcoViewer />},
      ]
    },
    {
      path: "*",
      element: <MainLayout />,
      children: [
        { path: "*", element: <Navigate to="/" replace />}
      ]
    }
  ]);
  
  return element;
}
