import React from 'react'
import Container from '../components/Layouts/Container'
import Breadcrumbs from '../components/Layouts/Breadcrumbs'
import aboutImg from '../assets/about.jpg'
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdHeadsetMic } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import Subscribe from '../components/Subscribe/Subscribe';



const About = () => {
    return (
        <>
            <div className="">
                <Container>
                    <div className="py-16">
                        <Breadcrumbs
                            title='About'
                            link='/about'
                        />
                    </div>

                    <div className="pb-20">
                        <div className="flex gap-10 items-center md:flex-row flex-col w-full">
                            <div className="md:w-2/6 w-full">
                                <img src={aboutImg} alt="" className='rounded-lg'/>
                            </div>
                            <div className="md:w-3/6 w-full">
                                <div className="px-5 flex flex-col gap-10">
                                    <h2 className='uppercase text-3xl font-bold text-teal-600'>ABOUT US</h2>
                                    <p className='text-secondary '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora quod voluptas libero, placeat ad enim obcaecati itaque, quas laboriosam sapiente qui, officia harum? Sunt tenetur quidem, laborum facilis, porro illo aperiam possimus perferendis amet earum est magni animi quae repellendus iste fugit quis maiores saepe qui ea vel? Impedit, hic suscipit culpa quisquam autem eaque accusamus incidunt nihil? Quo dolorem minus tempora amet rem vitae, recusandae, nulla nobis iure voluptatibus adipisci perspiciatis obcaecati ducimus praesentium repellat? Fugit harum recusandae sapiente doloribus deserunt. Ducimus ipsam, beatae praesentium fuga illum ex doloribus fugit nobis. Placeat obcaecati architecto tempore, itaque iusto at magnam.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-10">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-2 xl:gap-10">
                            <div className="shadow-md border rounded-md p-5 hover:bg-slate-200 cursor-pointer hover:shadow-xl">
                                <LiaShippingFastSolid className='text-8xl'/>
                                <h2 className='text-primary text-3xl py-3 font-semibold'>Free Shipping</h2>
                                <p className='text-secondary'>Free Shipping World Wide.</p>
                            </div>
                            <div className="shadow-md border rounded-md p-5 hover:bg-slate-200 cursor-pointer hover:shadow-xl">
                                <MdHeadsetMic className='text-8xl'/>
                                <h2 className='text-primary text-3xl py-3 font-semibold'>24 X 7 Service</h2>
                                <p className='text-secondary'>Online Service For New Customer.</p>
                            </div>
                            <div className="shadow-md border rounded-md p-5 hover:bg-slate-200 cursor-pointer hover:shadow-xl">
                                <BiSolidOffer className='text-8xl'/>
                                <h2 className='text-primary text-3xl py-3 font-semibold'>Festival Offer</h2>
                                <p className='text-secondary'>New Online Special Festival Offer.</p>
                            </div>
                        </div>
                    </div>
                </Container>
                <Subscribe/>
            </div>
        </>
    )
}

export default About