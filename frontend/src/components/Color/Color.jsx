import React, { useEffect, useState } from 'react'
import LeftSidebarContent from '../Layouts/LeftSidebarContent'
import api from '../../Http';
import { useNavigate } from 'react-router-dom';

const Color = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const colors = async () => {
            try {
                const response = await api.get(`/colors`);
                if (response.data.status == true) {
                    setItems(response.data.colors)
                }
                else {
                    console.log('colors Get some issue!')
                }
            } catch (error) {
                console.error(error.data.message)
            }
        }
        colors();
    });
    const handleSidebar = (value) => {
        navigate(`/shop?color=${value}`)
    }
    return (
        <LeftSidebarContent
            title='Shop by Color'
            items={items}
            handleSidebar={handleSidebar}
        />
    )
}

export default Color