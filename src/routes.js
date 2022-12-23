import { useRoutes } from "react-router-dom";
import { BuilderColorCode } from './components/builder';
import MainLayout from './layouts/MainLayout'
import HomePage from './components/home'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from "./components/account/Profile";

export default function Router() {
  let element = useRoutes([
    {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/builder', element: <BuilderColorCode /> },
          { path: '/profile', element: <Profile /> },
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },

        ]
      },
    {
      path: '/builder',
      element: <BuilderColorCode />,
      children: []
    },
    {
      path: '/login',
      element: <Login />,
      children: []
    },
    {
      path: '/register',
      element: <Register />,
      children: []
    },
    {
      path: '/profile',
      element: <Profile />
    }
  ])
  return element
}