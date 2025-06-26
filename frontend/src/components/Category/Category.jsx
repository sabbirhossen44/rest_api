import React, { useEffect, useState } from 'react'
import LeftSidebarContent from '../Layouts/LeftSidebarContent'
import api from '../../Http';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([]);
  useEffect(() => {
    const categories = async () => {
      try {
        const response = await api.get(`/categorys`);
        if (response.data.status == true) {
          setItems(response.data.categories);
        }
      } catch (error) {
        console.error(error.data.message)
      }
    }
    categories();
  });
  const handleSidebar = (value) => {
    navigate(`/shop?category=${value}`)
  };
  return (
    <>
      <LeftSidebarContent
        title="Shop by Category"
        items={items}
        handleSidebar={handleSidebar}

      />
    </>
  )
}

export default Category