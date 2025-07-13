import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import TawkMessenger from '../TawkMessenger/TawkMessenger'
import { AdminAuthContext } from '../../components/Context/AdminAuth'

const RootLayout = () => {
  const { user } = useContext(AdminAuthContext);
  return (
    <>
      <Navbar />
      <Header />
      <Outlet />
      {
        user &&
        <TawkMessenger />
      }
      <Footer />
    </>
  )
}

export default RootLayout