import React, { useEffect, useState } from "react";
import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { useDispatch } from "react-redux";

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
import { setMessage } from "./slices/messageSlice.js";
import { expiredJWT } from "./slices/accountSlice.js";

export default function Router() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const token = localStorage.getItem("token")
  const { decodedToken, isExpired } = useJwt(token);
  
  
  console.log("isExpired: ", isExpired)

  useEffect(() => {
    if (isExpired === true && isLoggedIn === true) {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      dispatch(expiredJWT(false))
      dispatch(setMessage("JW Token Expired. Please log in again"))
      console.log("isExpired", isExpired, "JW Token Expired. Please log in again")
    }
  }, [isExpired, dispatch])


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
