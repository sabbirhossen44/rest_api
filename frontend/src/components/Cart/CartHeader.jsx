import React from 'react'
import Flex from '../Layouts/Flex'
import Cart from '../../assets/cart.png';
import { ImCross } from "react-icons/im";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../Http';

const handelDelete = async(id) => {
    try {
        const response = await api.get(`/cart/delete/${id}`);
        if (response) {
            toast.success(response.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
}


const CartHeader = ({ cart }) => {
    const navigate = useNavigate();
    const subtotal = cart.reduce((total, item) => {
        return total + item.cart_to_product.after_discount * item.quantity;
    }, 0);
    return (
        <>
            
            <ToastContainer />
            <div className="w-[360px] z-50 absolute  top-[40px] right-0 bg-white shadow-md shadow-[#F5F5F3] text-primary">
                {
                    cart &&
                    cart.map((data, index) => (
                        <Flex key={index} className="justify-between p-5 items-center  border-b-[1px] border-[#F5F5F3]">
                            <div className="">
                                <img src={data.photo} alt="" className='w-[80px] h-[80px] object-cover' />
                            </div>

                            <div className="">
                                <h3 className='font-bold text-primary text-base'>Black Smart Watch</h3>
                                <p className='font-bold text-primary text-base flex items-center'>
                                    <FaBangladeshiTakaSign />{data.cart_to_product.after_discount} X {data.quantity}</p>
                                <p className='font-bold text-primary text-base flex items-center'>
                                    <FaBangladeshiTakaSign /> {data.cart_to_product.after_discount * data.quantity}</p>
                            </div>
                            <div className="">
                                <button onClick={() => handelDelete(data.id)}><ImCross /></button>
                            </div>
                        </Flex>
                    ))
                }
                <div className="p-1">
                    {
                        cart.length > 0 && (
                            <h3 className='text-[#767676] text-base mt-4 flex gap-3'>
                                subtotal: <span className='text-primary font-bold flex items-center'>
                                    <FaBangladeshiTakaSign /> {subtotal}
                                </span>
                            </h3>
                        )
                    }
                    <div className="flex gap-5">
                        <button onClick={() => navigate('/viewcart')} className='bg-transparent text-primary border ease-in duration-300 border-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md mt-3 w-full font-bold'>View Cart</button>
                        <button className='bg-transparent text-primary border ease-in duration-300 border-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md mt-3 w-full font-bold'>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartHeader