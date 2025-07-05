import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Layouts/Container'
import { AdminAuthContext } from '../components/Context/AdminAuth';
import Breadcrumbs from '../components/Layouts/Breadcrumbs'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom';
import { FaBangladeshiTakaSign } from "react-icons/fa6";



const Checkout = () => {
    const { cart, fetchCart } = useContext(AdminAuthContext);
    const [subtotal, setSubtotal] = useState();
    const {
        register,
        handleSubmit,
        // reset,
        setValue,
        formState: { errors },
    } = useForm()
    const location = useLocation();
    const { coupon } = location.state;
    useEffect(() => {
        const data = localStorage.getItem('adminInfo');
        if (data) {
            const parsedData = JSON.parse(data);
            const customer = parsedData?.admin?.customer;

            setValue('id', customer.id || '');
            setValue('name', customer.name || '');
            setValue('email', customer.email || '');
            setValue('number', customer.number || '');
        }
    }, [setValue])
    const onSubmit = (data) => {
        console.log(data)
        // reset()
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
    return (
        <>
            <div className="py-20">
                <Container>
                    <div className="mb-10">
                        <Breadcrumbs
                            title='Checkout'
                            link='/checkout'
                        />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register('id')} />
                        <div className="flex gap-20">
                            <div className="w-2/4">
                                <div className="mb-3">
                                    <label htmlFor="" className='text-secondary mb-1 block'>Full Name*</label>
                                    <input type="text"
                                        {...register('name', {
                                            required: 'Name filed is required'
                                        })}
                                        className='outline-none border w-full py-2 px-4 rounded-md'
                                    />
                                    {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='text-secondary mb-1 block'>Email*</label>
                                    <input type="email"
                                        {...register('email', {
                                            required: 'Email filed is required',
                                            pattern:
                                            {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email format'
                                            }
                                        })}
                                        className='outline-none border w-full py-2 px-4 rounded-md'
                                    />
                                    {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='text-secondary mb-1 block'>Phone Number*</label>
                                    <input type="numbar"
                                        {...register('number', {
                                            required: 'Number filed is required'
                                        })}
                                        className='outline-none border w-full py-2 px-4 rounded-md'
                                    />
                                    {errors.number && <p className='text-red-500 text-sm'>{errors.number.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='text-secondary mb-1 block'>Company Name</label>
                                    <input type="text"
                                        {...register('companyNumber')}
                                        className='outline-none border w-full py-2 px-4 rounded-md'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='text-secondary mb-1 block'>Town/City*</label>
                                    <input type="text"
                                        {...register('city', {
                                            required: 'City filed is required'
                                        })}
                                        className='outline-none border w-full py-2 px-4 rounded-md'
                                    />
                                    {errors.city && <p className='text-red-500 text-sm'>{errors.city.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='text-secondary mb-1 block'>Street Address*</label>
                                    <input type="text"
                                        {...register('address', {
                                            required: 'Address filed is required'
                                        })}
                                        className='outline-none border w-full py-2 px-4 rounded-md'
                                    />
                                    {errors.address && <p className='text-red-500 text-sm'>{errors.address.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='text-secondary mb-1 block'>Zip Code*</label>
                                    <input type="number"
                                        {...register('zip', {
                                            required: 'Zip filed is required'
                                        })}
                                        className='outline-none border w-full py-2 px-4 rounded-md'
                                    />
                                    {errors.zip && <p className='text-red-500 text-sm'>{errors.zip.message}</p>}
                                </div>
                            </div>
                            <div className="w-2/4">
                                <div className="w-full">
                                    {
                                        cart && cart.map((data, index) => (
                                            <div className="w-full flex justify-between items-center mb-8" key={index}>
                                                <div className="flex gap-5 items-center">
                                                    <div className="">
                                                        <img src={data.photo} className='w-16 h-16 object-cover' alt="" />
                                                    </div>
                                                    <div className="">{data.cart_to_product.product_name}</div>
                                                </div>
                                                <div className="flex items-center gap-1"> <FaBangladeshiTakaSign /> {data.cart_to_product.after_discount * data.quantity} </div>
                                            </div>
                                        ))
                                    }
                                    <div className="">
                                        <div className="py-2 border-b flex justify-between items-center">
                                            <div className="font-bold text-lg">Subtotal:</div>
                                            <div className="flex gap-1 items-center"><FaBangladeshiTakaSign />{subtotal}</div>
                                        </div>
                                        <div className="py-2 border-b flex justify-between items-center">
                                            <div className="font-bold text-lg">Coupon:</div>
                                            <div className="flex gap-1 items-center"><FaBangladeshiTakaSign />-{coupon? coupon: 0}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className='bg-black text-white px-10 py-3 text-lg font-bold shadow-md rounded-md'>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Container>
            </div>
        </>
    )
}

export default Checkout