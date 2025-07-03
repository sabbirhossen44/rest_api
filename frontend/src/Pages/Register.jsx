import React from 'react'
import Container from '../components/Layouts/Container'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import api from '../Http';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/customer/register', data);
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message)
    }
    reset()
  }

  return (
    <>
      <ToastContainer />
      <div className="py-10">
        <Container>
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1">Password</label>
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
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1">Confirm Password</label>
                <input
                  type="password"
                  {...register('confirm_password', {
                    required: 'Please confirm your password',
                    validate: (value, context) =>
                      value === context.password || 'Passwords do not match'
                  })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring"
                />
                {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Register
              </button>

              <h4 className='text-secondary mt-4 text-center'>
                Already have an account?{' '}
                <span className='text-blue-600'>
                  <Link to='/login'>Login here</Link>
                </span>
              </h4>
            </form>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Register
