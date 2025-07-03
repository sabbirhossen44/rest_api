import React from 'react'
import Container from '../components/Layouts/Container'
import Breadcrumbs from '../components/Layouts/Breadcrumbs'

const ViewCart = () => {
  return (
    <>
      <div className="py-20">
        <Container>
          <div className="mb-10">
            <Breadcrumbs
              title='Cart'
              link='/viewcart'
            />
          </div>
          <div className="w-full">
            <table className='table-auto w-full shadow-md shadow-gray-300'>
              <thead className=''>
                <tr className='text-left bg-[#f5f5f5] py-5'>
                  <th className='py-5 text-xl text-primary'>Product</th>
                  <th className='py-5 text-xl text-primary'>Price</th>
                  <th className='py-5 text-xl text-primary'>Quantity</th>
                  <th className='py-5 text-xl text-primary'>Total</th>
                  <th className='py-5 text-xl text-primary'>Action</th>
                </tr>
              </thead>
              <tbody className=''>
                <tr className='border-b-2 border-gray-100 odd:bg-white even:bg-slate-100'>
                  <td className='py-5 text-lg '>sdfdk</td>
                  <td className='py-5 text-lg '>40</td>
                  <td className='py-5 text-lg '>40</td>
                  <td className='py-5 text-lg '>40</td>
                  <td className='py-5 text-lg '>40</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ViewCart