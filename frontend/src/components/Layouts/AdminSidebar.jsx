import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminAuthContext } from '../Context/AdminAuth';

// AdminSidebar contains links to all admin pages
const AdminSidebar = () => {
    const {logout} = useContext(AdminAuthContext)
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Order List", path: "/admin/settings" },
  ];

  return (
    <div className="w-[220px] bg-gray-800 p-5 text-white">
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
  );
};

export default AdminSidebar;