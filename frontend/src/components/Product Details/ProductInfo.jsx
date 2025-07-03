import React, { useEffect, useState } from 'react'
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import api from '../../Http';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';


const ProductInfo = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectColor, setSelectColor] = useState(null);
  const [AllquentityColor, setAllquentity] = useState(null);
  const [allSizes, setAllSizes] = useState(false);
  const [button, setButton] = useState(false);
  const [activeSizeId, setActiveSizeId] = useState(null);
  const [sizes, setSize] = useState([]);
  const [stockMsg, setStockMsg] = useState('');
  const [user, setUser] = useState([]);

  const avg = 4;

  useEffect(() => {
    const data = localStorage.getItem('adminInfo');
    if (data) {
      const parsedData = JSON.parse(data);
      setUser(parsedData?.admin?.customer?.id);
    }
  }, [])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const uniqueSizes = Array.from(
    new Map(data.product.pro_to_inv.map(item => [item.size_id, item])).values()
  );
  const uniqueColors = Array.from(
    new Map(data.product.pro_to_inv.map(item => [item.color_id, item])).values()
  )
  const handleColorChange = (colorId) => {
    setSelectColor(colorId);
    api.post(`/getSize`, {
      product_id: data.product.id,
      color_id: colorId
    }).then(res => {
      if (res.data.status) {
        setSize(res.data.size);
        setStockMsg('');
      }
    });
  }
  const handelSize = (sizeID) => {
    setActiveSizeId(sizeID)
    api.post('/getQuantity', {
      product_id: data.product.id,
      color_id: selectColor,
      size_id: sizeID,
    }).then(res => {
      setStockMsg(res.data)
      setAllquentity(res.data.quantity)
    });
  }
  useEffect(() => {
    if (quantity < 1) {
      setQuantity(1);
    }
    setValue('quantity', quantity);
  }, [quantity, setValue]);
  useEffect(() => {
    setValue('color_id', selectColor);
    setValue('size_id', activeSizeId);
    setValue('customer_id', user);
  }, [selectColor, activeSizeId, setValue, user]);

  const onSubmit = async (formData) => {
    if (!selectColor) {
      alert('Please select a color');
      return;
    }
    if (!activeSizeId) {
      alert('Please select a size');
      return;
    }
    const data = localStorage.getItem('adminInfo');
    if (!data) {
      alert('Please Login first')
    }
    try {
      const response = await api.post('/cart/store', formData);
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" value={data.product.id} {...register('product_id')} />
          <input type="hidden" value={user.id} {...register('customer_id')} />
          <div className="">
            <h2 className='text-3xl font-bold text-primary'>{data.product.product_name}</h2>
            <h4 className='flex items-center text-xl mt-2 text-primary'><FaBangladeshiTakaSign /> {data.product.after_discount} {data.product.discount && <span className='flex items-center ms-6 line-through text-secondary'> <FaBangladeshiTakaSign /> {data.product.price}</span>} </h4>
            <div className="flex text-yellow-500 text-xl my-2 items-center ">
              {[...Array(5)].map((_, i) =>
                i < avg ? <IoIosStar key={i} /> : <IoIosStarOutline key={i} />
              )}
              <span className='ms-3 text-primary'>{avg}</span>
            </div>
            <p className='text-secondary text-wrap py-3'>{data.product.short_desp}</p>

            <div className="pb-5">
              <h3 className='py-2'>Color:</h3>
              {
                uniqueColors.map((color) => (
                  <label key={color.color_id} onClick={() => setAllSizes(true)} className="inline-flex items-center cursor-pointer me-3">
                    <input
                      type="radio"
                      name="color"
                      value={color.color_id}
                      onChange={() => handleColorChange(color.color_id)}
                      className="hidden"
                    />
                    <span
                      style={{ backgroundColor: color.inv_to_color?.color_code }}
                      className={`w-6 h-6 rounded-full border border-gray-400 inline-block transition-all duration-300 ${selectColor == color.color_id ? 'border-black scale-110' : 'border-gray-400'
                        }`}
                      title={color.inv_to_color?.color_name}
                    >
                      &nbsp;&nbsp;&nbsp;
                    </span>
                  </label>
                ))
              }
            </div>

            <div className="pb-5">
              <h3 className='py-2'>Size:</h3>
              {
                allSizes ?
                  sizes.map((size) => (
                    <label key={size.size_id} onClick={() => setButton(true)} className='inline-flex items-center cursor-pointer ms-2'>
                      <button
                        type='button'
                        onClick={() => { handelSize(size.size_id); setActiveSizeId(size.size_id); }}
                        onChange={() => handelSize(size.size_id)}
                        className={`border ${activeSizeId === size.size_id ? 'bg-yellow-500 text-white' : 'hover:bg-yellow-500 hover:text-white'} py-2 px-4 shadow-sm rounded-md`
                        }>{size.inv_to_size.size_name}</button>
                    </label>
                  ))
                  :
                  uniqueSizes.map((size) => (
                    <label key={size.size_id} className="inline-flex items-center cursor-pointer ms-2">
                      <button
                        type='button'
                        onClick={() => setActiveSizeId(size.size_id)}
                        className={`border ${activeSizeId === size.size_id ? 'bg-yellow-500 text-white' : 'hover:bg-yellow-500 hover:text-white'} py-2 px-4 shadow-sm rounded-md`
                        }>{size.inv_to_size.size_name}</button>

                    </label>
                  ))
              }
            </div>
            {
              stockMsg &&
              <div className="pb-5">
                <p className={`${stockMsg.className} `}>{stockMsg.message}</p>
              </div>
            }
            <div className="pb-5">
              <div className="flex items-center space-x-2 gap-3">
                <div className="flex border rounded-md overflow-hidden">
                  <input
                    type="number"
                    {...register('quantity', { required: true, min: 1 })}
                    // name="quentuty"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className='w-12 p-2 text-center focus:outline-none text-lg' id="" />
                  <div className="flex flex-col">
                    <h2 onClick={() => setQuantity(e => e + 1)} className='flex items-center justify-center w-9 h-6 text-xl border-l border-b cursor-pointer text-gray-600 hover:bg-gray-100 rounded-tr-md'>+</h2>
                    <h2 onClick={() => setQuantity(e => e > 1 ? e - 1 : 1)} className='flex items-center justify-center w-9 h-6 text-xl border-l cursor-pointer text-gray-600 hover:bg-gray-100 rounded-tr-md'>-</h2>
                  </div>
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid quantity.</p>
                  )}
                </div>

                <div className="">
                  {
                    button ?

                      AllquentityColor > 0 ?
                        <button type='submit' className="bg-green-500 hover:bg-green-600 text-white py-2.5 text-xl px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                          Add To Cart
                        </button>
                        :
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2.5 text-xl px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                          {stockMsg.message}
                        </button>

                      :

                      <button className="bg-green-500 hover:bg-green-600 text-white py-2.5 text-xl px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Add To Cart
                      </button>

                  }
                </div>
                <div >
                  <button type='button' className=" hover:bg-yellow-500 border border-yellow-500 hover:text-white text-primary py-2.5 text-xl px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 text-xl w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>


              </div>
            </div>

          </div>
        </form>
      </>
    </>
  )
}

export default ProductInfo