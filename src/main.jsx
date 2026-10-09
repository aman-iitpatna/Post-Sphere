import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './main.css'
import Home from './Pages/Home.jsx'
import Createpost from './Pages/Createpost.jsx'
import Login from './Pages/Login.jsx'
import User from './Pages/User.jsx'
import Page from './Pages/Page.jsx'
import Editpost from './Pages/Editpost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'createpost',
        element: <Createpost/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'user',
        element: <User/>
      },
      {
        path: 'page/:id',
        element: <Page/>
      },
      {
        path: 'editpost',
        element: <Editpost/>
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
