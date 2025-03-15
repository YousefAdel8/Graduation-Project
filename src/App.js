import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BeatLoader } from "react-spinners";

// Import components
import Signin from './components/Form/Form.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import SideBar from './components/Dashboard/SideBar/SideBar.jsx';
import Tables from './components/Dashboard/FeedbackTable/Tables.jsx';

function App() {
  const routers = createBrowserRouter([
    {
      path: '/signin', 
      element: <Signin />,
    },
    {
      path: '/', 
      element: <Signin />,
    },
    {
      path: '/',
      element: <SideBar />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/feedback',
          element: <Tables />,
        },
      ]
    },
    {
      path: '*',
      element: <div className='vh-100 d-flex justify-content-center align-items-center'>
        <BeatLoader color="#36d7b7" size={60}  />
      </div>
    }
  ]);
  
  return (
    <RouterProvider router={routers} />
  );
}

export default App;