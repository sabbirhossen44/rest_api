import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import RootLayout from './components/Layouts/RootLayout.jsx';
import Home from './Pages/Home.jsx';
import Shop from './Pages/Shop.jsx'
import Product_Details from './Pages/Product_Details.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Dashboard from './Pages/Admin/Dashboard.jsx';
import { AdminReqireAuth } from './components/Context/AdminRequireAuth.jsx'
import { AdminAuthProvider } from './components/Context/AdminAuth.jsx'
import DashboardLayout from './components/Layouts/DashboardLayout.jsx'
import AccountDetails from './Pages/Admin/Users.jsx'
import Users from './Pages/Admin/Users.jsx'
import Settings from './Pages/Admin/Settings.jsx'
import ViewCart from './Pages/ViewCart.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
    // errorElement={<ErrorPage />}
    >

      <Route index element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/product_details/:slug' element={<Product_Details />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/admin" element={<AdminReqireAuth><DashboardLayout /></AdminReqireAuth>}>
        <Route path="dashboard" element={<AdminReqireAuth><Dashboard /></AdminReqireAuth>} />
        <Route path="users" element={<AdminReqireAuth><Users /></AdminReqireAuth>} />
        <Route path="settings" element={<AdminReqireAuth><Settings /></AdminReqireAuth>} />
      </Route>
      <Route path='/viewcart' element={<AdminReqireAuth><ViewCart /></AdminReqireAuth>} />

    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <RouterProvider router={router} />
    </AdminAuthProvider>
  </React.StrictMode>
)
