import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BeatLoader } from "react-spinners";

// Import components
import Signin from './components/Form/Form.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import FeedbackPage from './components/FeedbackPage/FeedbackPage.jsx';
import ReportPage from './components/ReportPage/ReportPage.jsx';
import SocialMedia from './components/SocialMedia/SocialMedia.jsx'
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
          element: <FeedbackPage />,
        },
        {
          path: '/report',
          element: <ReportPage />,
        },
        {
          path: '/socialmedia',
          element:<SocialMedia />,
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