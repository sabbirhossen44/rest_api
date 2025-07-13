import React from 'react'
import Container from '../Layouts/Container'
import bg_img from '../../assets/cta-bg.jpg'
import { useForm } from "react-hook-form";
import api from '../../Http';
import { ToastContainer, toast } from 'react-toastify';
const Subscribe = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            const response = await api.post('/subscribe', data);
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
        reset()
    };
    return (
        <>
        <ToastContainer/>
            <div className="pb-14">
                <Container>
                    <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${bg_img})` }}>
                        <div className="md:p-20 px-5 py-10">
                            <h2 className='text-white font-bold md:text-4xl text-3xl'>Subscribe Our Newsletter</h2>
                            <div className="pt-8">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex">
                                        <input type="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            className='md:px-4 px-3 py-3 md:text-xl md:w-3/12 w-8/12 inline-block outline-none'
                                            placeholder='Your Email...'
                                            />
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                        <button type="submit"
                                            className='bg-black text-white md:px-9  md:text-xl px-2 font-semibold hover:bg-green-700'
                                        >Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Subscribe