import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BeatLoader } from "react-spinners";

// Import components
import Dashboard from './components/Dashboard/Dashboard.jsx';
import FeedbackPage from './components/FeedbackPage/FeedbackPage.jsx';
import ReportPage from './components/ReportPage/ReportPage.jsx';
import SocialMedia from './components/SocialMedia/SocialMedia.jsx'

//Auth
import RequireAuth from './components/Auth/RequireAuth.jsx';
function App() {
  const routers = createBrowserRouter([
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/',
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