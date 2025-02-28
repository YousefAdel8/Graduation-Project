import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BeatLoader	} from "react-spinners";
import Signin from './components/Form/Form.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
function App() {
  //let user = localStorage.getItem('user');
  let routers = createBrowserRouter([
    
    {
      path: '/signin', 
      element: <Signin />,
    }
    ,
    {
      path: '', 
      element: <Signin />,
      
    }
    ,
    {
      path: '/dashboard', 
      element: <Dashboard />,
    }
    /*,
    {
      path: '', 
      element: <Tables />,
      children: [ 
        {
          path: '/',  
          element: <ReportsTable />
        },
        {
          path: 'charts',
          element: <Charts />
        },
      ]
    }*/,
    {
      path: '*',
      element: <div className='vh-100 d-flex justify-content-center align-items-center'>
        <BeatLoader	 color="black" size={60} />
      </div>
    }
  ]);
  
  return <>
    <RouterProvider router={routers} > </RouterProvider>
  </>
}

export default App;
