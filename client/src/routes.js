import { useRoutes } from "react-router-dom";
import { BuilderColorCode } from './components/builder';
import MainLayout from './layouts/MainLayout'
import HomePage from './components/home'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AccountPage from "./components/account";
import Resources from "./components/resources";

export default function Router() {
  let element = useRoutes([
    {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/builder', element: <BuilderColorCode /> },
          { path: '/profile', element: <AccountPage /> },
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
          { path: '/resources', element: <Resources /> },

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
      element: <AccountPage />
    }
  ])
  return element
}