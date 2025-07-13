import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminAuthContext } from '../Context/AdminAuth';
import User from '../../assets/user.jpg'
import { HiMenuAlt3, HiX } from 'react-icons/hi';

// AdminSidebar contains links to all admin pages
const AdminSidebar = () => {
  const { logout } = useContext(AdminAuthContext)
  const [show, setShow] = useState(false);
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Order List", path: "/admin/orderlists" },
  ];
  const [user, setUser] = useState('');
  useEffect(() => {
    const data = localStorage.getItem('adminInfo');
    if (data) {
      const parsedData = JSON.parse(data);
      setUser(parsedData.admin.customer);
    }
  }, [])

  return (
    <>
      <div className="w-[220px] bg-gray-800 p-5 text-white hidden md:block">
        <div className="mb-4 w-full flex justify-center items-center">
          {
            user.photo_url ?
              <img src={user.photo_url} alt="" className='w-24 h-24 object-cover rounded-full' />
              :
              <img src={User} alt="" className='w-24 h-24 object-cover rounded-full' />
          }
        </div>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 font-bold" : "text-white"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li className='hover:text-yellow-300 hover:font-bold cursor-pointer' onClick={logout}>Logout</li>
        </ul>
      </div>

      <div className=" bg-gray-800 p-5 text-white block md:hidden">
        <div className="flex justify-between relative">
          <div className="w-full">
            {
              user.photo_url ?
                <img src={user.photo_url} alt="" className='w-16 h-16 object-cover rounded-full' />
                :
                <img src={User} alt="" className='w-24 h-24 object-cover rounded-full' />
            }
          </div>
          {/* <h2 className="text-xl font-bold mb-6">Admin Panel</h2> */}
          <div className="ml-auto">
            <button onClick={() => setShow(!show)}>
              {show ? <HiX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
            </button>
          </div>
          {
            show && (
              <ul className="space-y-4 absolute right-0 top-16 px-6 py-5 bg-gray-800">
                {links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "text-yellow-300 font-bold" : "text-white"
                      }
                      onClick={() => setShow(false)}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li className='hover:text-yellow-300 hover:font-bold cursor-pointer' onClick={logout}>Logout</li>
              </ul>
            )
          }
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;