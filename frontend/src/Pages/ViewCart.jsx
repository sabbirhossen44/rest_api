import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Layouts/Container'
import Breadcrumbs from '../components/Layouts/Breadcrumbs'
import { AdminAuthContext } from '../components/Context/AdminAuth';
import api from '../Http';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



const ViewCart = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = useContext(AdminAuthContext);
  const [subtotal, setSubtotal] = useState();
  const [coupon, setCoupon] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    setValue('subtotal', subtotal);
  }, [subtotal, setValue]);
  const onSubmit = async (data) => {
    try {
      const response = await api.post('/coupon', data);
      if (response) {
        setCoupon(response.data.total);
        fetchCart();
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    reset()
    setValue('subtotal', subtotal);
  }
  // Quantity update handler
  const handleQuantityUpdate = async (cartId, quantity) => {
    try {
      await api.put(`/cart/update/${cartId}`, { quantity });
      fetchCart();
    } catch (error) {
      toast.error("Quantity update failed", error);
    }
  };
  const handelDelete = async (cartId) => {
    try {
      await api.get(`/cart/delete/${cartId}`);
      fetchCart();
    } catch (error) {
      toast.error("Quantity update failed", error);
    }
  }

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((acc, item) => {
        return acc + item.cart_to_product.after_discount * item.quantity;
      }, 0);
      setSubtotal(total);
    } else {
      setSubtotal(0);
    }
  }, [cart]);

  const handelCheckout = () => {
    navigate('/checkout', {
      state: {
        coupon: coupon,
        subtotal: subtotal,
        total: subtotal - coupon,
      }
    })
  }

  return (
    <>
      <ToastContainer />
      <div className="py-20">
        <Container className='2xl:mx-auto mx-2'>
          <div className="mb-10 2xl:mx-auto mx-4">
            <Breadcrumbs
              title='Cart'
              link='/viewcart'
            />
          </div>
          <div className="w-full">
            <table className='table-auto w-full shadow-md shadow-gray-300'>
              <thead>
                <tr className='text-center bg-[#f5f5f5] py-5 '>
                  <th className='py-5 md:text-xl text-sm text-primary'>Product</th>
                  <th className='py-5 md:text-xl text-sm text-primary md:block hidden '>Price</th>
                  <th className='py-5 md:text-xl text-sm text-primary'>Quantity</th>
                  <th className='py-5 md:text-xl text-sm text-primary'>Total</th>
                  <th className='py-5 md:text-xl text-sm text-primary'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart && cart.map((data, index) => (
                    <tr key={index} className='border-b-2 text-center border-gray-100 odd:bg-white even:bg-slate-100'>
                      <td className='py-5 text-lg '>
                        <img className='h-16 w-16 object-cover inline-block ' src={data.photo} alt="" />
                      </td>
                      <td className='py-5 md:text-lg text-sm md:block hidden '>{data.cart_to_product.after_discount}</td>
                      <td className='py-5 md:text-lg text-sm'>
                        <div className="flex items-center md:space-x-2 space-x-1 md:gap-3 gap-1 justify-center">
                          <div className="flex border rounded-md overflow-hidden">
                            <input
                              type="number"
                              readOnly
                              value={data.quantity}
                              className='md:w-12 w-8 md:p-2 p-1 text-center focus:outline-none md:text-lg text-sm'
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={() => handleQuantityUpdate(data.id, data.quantity + 1)}
                                className='flex items-center justify-center w-9 h-6 text-xl border-l border-b cursor-pointer text-gray-600 hover:bg-gray-100 rounded-tr-md'>+
                              </button>
                              <button
                                onClick={() => {
                                  if (data.quantity > 1) {
                                    handleQuantityUpdate(data.id, data.quantity - 1);
                                  }
                                }}
                                className='flex items-center justify-center w-9 h-6 text-xl border-l cursor-pointer text-gray-600 hover:bg-gray-100 rounded-br-md'>-
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='py-5 md:text-lg  text-sm'>{data.cart_to_product.after_discount * data.quantity}</td>
                      <td className='py-5 md:text-lg text-sm'>
                        <button
                          onClick={() => handelDelete(data.id)}
                          className='bg-red-600 text-white md:py-2 py-1 md:px-3 px-2 shadow-md rounded-md hover:bg-red-800'>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              {/* <tfoot>
                <div className="p-5 inline-block">
                  <form>
                    <div className="flex items-center gap-4">
                      <div className="w-56">
                        <input type="text"
                          className='w-full outline-none border shadow-sm rounded-sm px-4 py-2'
                          placeholder='Coupon Name'
                        />
                      </div>
                      <div className="">adsfad</div>
                    </div>
                  </form>
                </div>
              </tfoot> */}
              <tfoot>
                <tr>
                  <td colSpan="5" className='py-5 md:px-5 px-3'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex items-center md:gap-4 gap-1">
                        <div className="flex flex-col">
                          <input
                            type="text"
                            {...register('name', {
                              required: 'name filed is required'
                            })}
                            className='w-56 outline-none border shadow-sm rounded-sm px-4 py-2'
                            placeholder='Coupon Name'
                          />
                          {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                        </div>
                        <button
                          type='submit'
                          className="bg-primary text-white md:px-4 px-2 py-2 rounded md:text-base text-sm shadow hover:bg-opacity-90"
                        >
                          Apply Coupon
                        </button>
                      </div>
                    </form>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="w-full mt-12">
            <div className="flex justify-end text-right">
              <div className="flex flex-col gap-4">
                <h2 className='text-2xl font-bold'>Cart Totals</h2>
                <div className="">
                  <div className="min-w-80  mt-10">
                    <table className="w-full border-t border-gray-200 text-left">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-2 font-semibold text-gray-800">Subtotal</td>
                          <td className="py-4 px-2 text-right text-gray-500 flex gap-1 justify-end items-center">{subtotal} <FaBangladeshiTakaSign className='inline-block' /></td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-2 font-semibold text-black text-lg">Coupon</td>
                          <td className="py-4 px-2 text-right text-gray-500 flex gap-1 justify-end items-center">{coupon}<FaBangladeshiTakaSign className='inline-block' /></td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-2 font-semibold text-black text-lg">Total</td>
                          <td className="py-4 px-2 text-right font-semibold text-black text-lg flex gap-1 justify-end items-center">{subtotal - coupon} <FaBangladeshiTakaSign className='inline-block' /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <button
                  onClick={handelCheckout}
                  className='text-white bg-black inline-block font-bold px-4 py-3 shadow-sm rounded-md'
                >Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ViewCart
