import React from 'react'
import Container from '../components/Layouts/Container'
import Breadcrumbs from '../components/Layouts/Breadcrumbs'
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { TbPhoneCall } from "react-icons/tb";
import { useForm } from "react-hook-form"
import api from '../Http';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/contactmessage', data);
      toast.success(response.data.message);
      reset()
    } catch (error) {
      toast.error(error.data.message);
    }

  }
  return (
    <>
      <ToastContainer />
      <div className="py-20">
        <Container>
          <Breadcrumbs
            title='Contact'
            link='/contact'
          />
          <div className="grid md:grid-cols-3 grid-cols-1 max-w-6xl mx-auto py-14 gap-10 md:gap-2 xl:10">
            <div className="border shadow-md rounded-lg py-5 px-5 text-center hover:cursor-pointer hover:bg-slate-100">
              <div className="w-full flex flex-col gap-5">
                <SlLocationPin className='text-center w-full font-semibold text-5xl' />
                <h2 className='text-3xl font-semibold'>Address</h2>
                <p className='text-secondary text-balance'>7 Green Lake Street Crawfordsville, IN 47933</p>
              </div>
            </div>
            <div className="border shadow-md rounded-lg py-5 px-5 text-center hover:cursor-pointer hover:bg-slate-100">
              <div className="w-full flex flex-col gap-5">
                <TfiEmail className='text-center w-full font-semibold text-5xl' />
                <h2 className='text-3xl font-semibold'>Email Us</h2>
                <div className="">
                  <p className='text-secondary text-balance'>sh3235662@gamil.com</p>
                  <p className='text-secondary text-balance'>sh3235662@gamil.com</p>
                </div>
              </div>
            </div>
            <div className="border shadow-md rounded-lg py-5 px-5 text-center hover:cursor-pointer hover:bg-slate-100">
              <div className="w-full flex flex-col gap-5">
                <TbPhoneCall className='text-center w-full font-semibold text-5xl' />
                <h2 className='text-3xl font-semibold'>Call Now</h2>
                <div className="">
                  <p className='text-secondary text-balance'>+1 800 123 456 789</p>
                  <p className='text-secondary text-balance'>+1 800 123 456 789</p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-10 text-center">
            <h2 className='text-primary font-semibold text-3xl'>Have Any Question?</h2>
            <p className='text-lg mt-3 text-secondary'>It is a long established fact that a reader will be distracted <br /> content of a page when looking.</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full border shadow-md rounded-lg p-6'>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                <div className="">
                  <input type="text"
                    {...register('name',
                      { required: 'Name field is Required' }
                    )}
                    className='border w-full px-5 py-3 outline-none rounded-md text-base'
                    placeholder='Enter Your Name'
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="">
                  <input type="email"
                    {...register('email',
                      {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address'
                        }
                      }
                    )}
                    className='border w-full px-5 py-3 outline-none rounded-md text-base'
                    placeholder='Enter Your Email'
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="">
                  <input type="text"
                    {...register('address',
                      { required: 'Address field is Required' }
                    )}
                    className='border w-full px-5 py-3 outline-none rounded-md text-base'
                    placeholder='Your Address'
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>
                <div className="">
                  <input type="text"
                    {...register('service',
                      { required: 'service field is Required' }
                    )}
                    className='border w-full px-5 py-3 outline-none rounded-md text-base'
                    placeholder='Services Type'
                  />
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
                </div>
              </div>
              <div className="py-5">
                <textarea
                  {...register('message',
                    { required: 'message field is Required' }
                  )}
                  className='border w-full px-5 py-3 outline-none rounded-md text-base'

                  placeholder='Message...'
                  cols="" rows="5"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              <div className=" w-full text-center pb-3">
                <button type="submit"
                  className='bg-green-600 text-white px-8 py-3 shadow-md rounded-lg hover:bg-green-700 hover:px-9 font-semibold text-lg'
                >Submit</button>
              </div>
            </form>
          </div>
        </Container>
      </div>
      <div className="mt-5 w-full">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.6475966126823!2d90.4217263760875!3d23.831127285670878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72f9e3c3387%3A0x6f770e90124df5ac!2sKhelkhet%2CDhaka-1229!5e0!3m2!1sen!2sbd!4v1752295702953!5m2!1sen!2sbd" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  )
}

export default Contact