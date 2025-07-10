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
            <div className="mt-28">
                <Container>
                    <Flex className="gap-10">
                        <div className="">
                            <img src={Adve_1} alt=""  className='w-full cursor-pointer' onClick={()=> navigate('/shop')}/>
                        </div>
                        <div className="flex flex-col gap-y-10">
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