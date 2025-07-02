import React, { useEffect, useState } from 'react'
import LeftSidebarContent from '../Layouts/LeftSidebarContent'
import api from '../../Http';
import { useNavigate } from 'react-router-dom';

const Brand = () => {
    const navigate = useNavigate();
    const [items , setItems] = useState([]);
    useEffect(()=>{
        const brands = async() =>{
            try {
                const response = await api.get('/brands');
                if (response.data.status == true) {
                    setItems(response.data.brands);
                } else {
                    console.log('brand Get some issue!')
                }
            } catch (error) {
                console.error(error.data.message)
            }
        }

        brands()
    },[])
    const handleSidebar = (value) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('brand', value);
        navigate(`/shop?${queryParams.toString()}`)
    }
  return (
    <LeftSidebarContent
        title='Shop by Brand'
        items = {items}
        handleSidebar = {handleSidebar}
    />
  )
}

export default Brand