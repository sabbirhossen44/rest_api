import React, { useContext } from 'react'
import Container from '../components/Layouts/Container'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import api from '../Http';
import { AdminAuthContext } from '../components/Context/AdminAuth';

const Login = () => {
    const { login } = useContext(AdminAuthContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await api.post('customer/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.status == true) {
                const adminInfo = {
                    token: response.data.token,
                    admin: response.data,
                }
                localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
                login(adminInfo);
                reset();
                toast.success('Login successful!');
                setTimeout(() => {
                    navigate(`/admin/dashboard`)
                }, 2000);
            } else {
                toast.error('Something is Wrong')
            }

        } catch (error) {
            toast.error(error.response.data.message || 'Login failed!');
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="py-16">
                <Container>
                    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Login</h2>
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern:
                                        {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Invalid email format'
                                        }
                                    })}
                                    className="w-full border p-2 rounded focus:outline-none focus:ring"
                                />
                                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                            </div>
                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                    className="w-full border p-2 rounded focus:outline-none focus:ring"
                                />
                                {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                            >
                                Login
                            </button>
                            <h4 className='text-secondary'>Don't have an account? <span className='text-green-600'><Link to='/register'>Create free account</Link></span></h4>
                        </form>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Login