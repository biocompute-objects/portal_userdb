
import React from "react";
import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BuilderColorCode } from "./components/builder";
import MainLayout from "./layouts/MainLayout"
import HomePage from "./components/home"
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AccountPage from "./components/account";
import Resources from "./components/resources";
import BcoDbs from "./components/bcodbs";
import Prefix from "./components/prefix";
import BcoViewer from "./components/viewer";
import GroupsPage from "./components/account/bcodbGroups";
import About from "./components/about";
import PasswordReset from "./components/auth/PasswordReset";

export default function Router() {
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn)
  
  let element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/builder", element: <BuilderColorCode /> },
        { path: "/viewer", element: <BcoViewer />},
        { path: "/profile", element: isLoggedIn
          ? <AccountPage />
          : <Navigate to="/login" />},
        { path: "/profile/bcodb/:id", element: isLoggedIn
          ? <GroupsPage />
          : <Navigate to="/login" />},
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/resources", element: <Resources /> },
        { path: "/bcodbs", element: <BcoDbs />},
        { path: "/prefix", element: <Prefix />},
        { path: "/about", element: <About />},
        { path: "/password_reset/confirm", element: <PasswordReset />},
      ]
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "404", element: <Navigate to="/" />},
        { path: "*", element: <Navigate to="/" />}
      ]
    }
  ])
  return element
}