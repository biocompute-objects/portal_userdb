import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import ObjectViewLayout from "./layouts/ObjectViewLayout";
import BuilderColorCode from "./components/builder";
import About from "./components/about";
import HomePage from "./components/home"
import GroupsPage from "./components/account/bcodbGroups";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import Register from "./components/auth/Register";
import AccountPage from "./components/account";
import BcoDbs from "./components/bcodbs";
import Resources from "./components/resources";
import Prefix from "./components/prefix";
import BcoViewer from "./components/viewer";

export default function Router() {
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  
  let element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "profile", element: isLoggedIn ? <AccountPage /> : <Navigate to="/login" replace />},
        { path: "profile/bcodb/:id", element: isLoggedIn ? <GroupsPage /> : <Navigate to="/login" replace />},
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "resources", element: <Resources /> },
        { path: "bcodbs", element: <BcoDbs />},
        { path: "prefix_registry", element: <Prefix />},
        { path: "prefix", element: <Navigate to="/prefix_registry" replace />},
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
