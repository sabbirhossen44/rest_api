import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Users = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()
  // const [user, setUser] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem('adminInfo');
    if (data) {
      const parsedData = JSON.parse(data);
      // setUser(parsedData.admin.customer);
      const customer = parsedData?.admin?.customer;

      setValue('name', customer?.name || '');
      setValue('email', customer?.email || '');
      setValue('number', customer?.number || '');
      setValue('address', customer?.address || '');
      setValue('zip', customer?.zip || '');
      setValue('id', customer?.id || '');
    }
  }, [setValue]);
  const onSubmit = async (data) => {
    console.log(data)
  }
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="py-5">
          <form className="p-6 bg-white shadow-md rounded-md max-w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1" htmlFor="username1">
                  User Name
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: 'name filed is required'
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1" htmlFor="username1">
                  User Email
                </label>
                <input
                  type="text"
                  {...register('email')}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1" htmlFor="username1">
                  User Phone
                </label>
                <input
                  type="number"
                  {...register('number')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1" htmlFor="username1">
                  Address
                </label>
                <input
                  type="text"
                  {...register('address')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1" htmlFor="username1">
                  Zip
                </label>
                <input
                  type="number"
                  {...register('zip')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>


            </div>

            <input type="hidden"
              {...register('id')}
              name="" />
            <div className="mt-6">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition duration-200"
              >
                Update
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default Users;