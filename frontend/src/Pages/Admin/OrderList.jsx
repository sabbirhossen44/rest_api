import React, { useEffect, useState } from 'react'
import api from '../../Http';
import { IoMdPrint } from "react-icons/io";


const OrderList = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const orderProduct = async () => {
      const data = JSON.parse(localStorage.getItem('adminInfo'));
      const customer = data?.admin?.customer;
      if (customer) {
        const response = await api.get(`/checkout/data/${customer.id}`);
        setProduct(response.data.order)
      }
    }
    orderProduct()
  });
  return (
    <>
      <div className="lg:block hidden">
        <h1 className="text-2xl font-bold mb-3">Order Lists</h1>
        <table className='table-auto w-full border shadow-md rounded-md overflow-hidden bg-white'>
          <thead >
            <tr className='bg-slate-400 text-white text-xl'>
              <th className='text-start py-3 px-4'>SL</th>
              <th className='text-start py-3 px-4'>Order Id</th>
              <th className='text-start py-3 px-4'>Total Price</th>
              <th className='text-start py-3 px-4'>Date</th>
              <th className='text-start py-3 px-4'>Status</th>
              <th className='text-start py-3 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              product && product.map((data, index) => (
                <tr key={index} className='odd:bg-white even:bg-slate-200 hover:bg-slate-300'>
                  <td className='py-3 px-3 text-wrap'>{index + 1}</td>
                  <td className='py-3 px-3 text-wrap'>{data.order_id}</td>
                  <td className='py-3 px-3 text-wrap'>{data.total}</td>
                  <td className='py-3 px-3 text-wrap'>{data.order_date}</td>
                  <td className={`py-3 px-3 text-wrap font-medium ${data.status == 0 ? 'text-yellow-500' :
                    data.status == 1 ? 'text-blue-500' :
                      data.status == 2 ? 'text-purple-500' :
                        data.status == 3 ? 'text-indigo-500' :
                          data.status == 4 ? 'text-green-600' :
                            data.status == 5 ? 'text-red-500' : 'text-gray-500'
                    }`}>
                    {
                      data.status == 0 ? 'Pending' :
                        data.status == 1 ? 'Processing' :
                          data.status == 2 ? 'Shipping' :
                            data.status == 3 ? 'Ready for Deliver' :
                              data.status == 4 ? 'Delivered' :
                                data.status == 5 ? 'Cancel' : 'Unknown'
                    }
                  </td>
                  <td>
                    <a
                      href={`http://127.0.0.1:8000/api/generatepdf/${encodeURIComponent(data.order_id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Invoice PDF
                    </a>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>



      <div className="block lg:hidden">
        <h1 className="text-2xl font-bold mb-3">Order Lists</h1>
        <table className='table-auto w-full border shadow-md rounded-md overflow-hidden bg-white'>
          <thead >
            <tr className='bg-slate-400 text-white text-[11px]'>
              <th className='text-start py-3 px-4'>Order Id</th>
              <th className='text-start py-3 px-4'>Status</th>
              <th className='text-start py-3 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              product && product.map((data, index) => (
                <tr key={index} className='odd:bg-white even:bg-slate-200 hover:bg-slate-300'>
                  <td className='py-3 px-3 text-wrap text-[10px]'>{data.order_id}</td>
                  <td className={`py-3 px-3 text-wrap font-medium  text-[12px] ${data.status == 0 ? 'text-yellow-500' :
                    data.status == 1 ? 'text-blue-500' :
                      data.status == 2 ? 'text-purple-500' :
                        data.status == 3 ? 'text-indigo-500' :
                          data.status == 4 ? 'text-green-600' :
                            data.status == 5 ? 'text-red-500' : 'text-gray-500'
                    }`}>
                    {
                      data.status == 0 ? 'Pending' :
                        data.status == 1 ? 'Processing' :
                          data.status == 2 ? 'Shipping' :
                            data.status == 3 ? 'Ready for Deliver' :
                              data.status == 4 ? 'Delivered' :
                                data.status == 5 ? 'Cancel' : 'Unknown'
                    }
                  </td>
                  <td>
                    <a
                      className=' text-[10px]'
                      href={`http://127.0.0.1:8000/api/generatepdf/${encodeURIComponent(data.order_id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoMdPrint className='text-xl'/>
                    </a>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderList