import React, { useEffect, useState } from 'react'
import api from '../../Http';
import { useNavigate } from 'react-router-dom';

const FShop = ({ className }) => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const data = async () => {
      const response = await api.get('/categorys');
      if (response.data.status) {
        setCategory(response.data.categories);
      }
    }
    data()
  })
   const handleClick = (value) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('search', value);
        navigate(`/shop?${queryParams.toString()}`);
    };
  return (
    <div className={`${className}`}>
      <h3 className='text-xl font-bold uppercase'>SHOP</h3>
      <ul className='mt-4 flex flex-col gap-2'>
        {
          category &&
          category && category.map((data, index) => (
            <li key={index} onClick={() => handleClick(data.id)} className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer' value={data.id}>{data.name}</li>
          ))
        }
        {/* <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li>
        <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li>
        <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li>
        <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li> */}
      </ul>
    </div>
  )
}

export default FShop