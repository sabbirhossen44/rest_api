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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      // errorElement={<ErrorPage />}
    >

      <Route index element={<Home />} />
      <Route  path='/shop' element={<Shop />} />

    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
