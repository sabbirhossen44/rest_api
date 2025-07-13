import React from 'react'
import Container from '../Layouts/Container'
import Flex from '../Layouts/Flex'
import Adve_1 from '../../assets/Ad_1.png';
import Adve_2 from '../../assets/Ad_2.png';
import Adve_3 from '../../assets/Ad_3.png';
import { useNavigate } from 'react-router-dom';

const Advertise = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="md:mt-28 mt-9">
                <Container>
                    <Flex className="md:gap-10 gap-4 md:flex-row flex-col">
                        <div className="">
                            <img src={Adve_1} alt=""  className='w-full cursor-pointer' onClick={()=> navigate('/shop')}/>
                        </div>
                        <div className="flex flex-col md:gap-y-10 gap-3">
                            <img src={Adve_2} alt="" className='w-full cursor-pointer' onClick={()=> navigate('/shop')}/>
                            <img src={Adve_3} alt="" className='w-full cursor-pointer' onClick={()=> navigate('/shop')}/>
                        </div>
                    </Flex>
                </Container>
            </div>
        </>
    )
}

export default Advertise