import React from 'react'
import Container from '../Layouts/Container'
import ads2 from '../../assets/ads2.png'
import { useNavigate } from 'react-router-dom'

const Ads_2 = () => {
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <div className="w-full bg-[#F3F3F3] flex items-center gap-4">
          <div className="w-2/6 text-center inline-block">
            <img src={ads2} alt="" />
          </div>
          <div className="w-4/6">
            <div className="w-[513px] flex flex-col gap-4 text-start">
              <h2 className='font-semibold text-2xl'>Watch of the year</h2>
              <p className=''>Lorem Ipsum is simply dummy text of the printing and typesetting industry orem Ipsum..</p>
              <button className=' w-44 py-2 text-lg bg-black text-white' onClick={()=> navigate('/shop')}>Shop Now</button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Ads_2