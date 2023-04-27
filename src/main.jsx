import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './Component/Shop/Shop';
import Home from './Component/Home/Home';
import Orders from './Component/Orders/Orders';
import Inventory from './Component/Inventory/Inventory';
import Login from './Component/Login/Login';
import cartProductsLoader from './Loaders/cartProductsLoaders'

const router = createBrowserRouter([
  {
    path: '/',  
    element: <Home/>,
    children: [
      {
        path: '/',
        element: <Shop/>
      },
      {
        path: 'orders',
        element: <Orders/>,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element: <Inventory/>
      },
      {
        path: 'login',
        element: <Login/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
