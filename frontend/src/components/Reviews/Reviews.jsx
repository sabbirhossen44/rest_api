import React, { useEffect, useState } from 'react'
import api from '../../Http';
import { format } from 'date-fns';
import StarRating from '../StarRating/StarRating';
import RatingForm from '../RatingForm/RatingForm';

const Reviews = ({ productData }) => {
    const [product, setProduct] = useState();
    const [customers, setCustomers] = useState();
    const [user, setUser] = useState();
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('adminInfo'));
        if (data) {
            setUser(data.admin.customer.id);
        }
    }, [setUser])
    useEffect(() => {
        const faceProduct = async () => {
            const response = await api.get(`/orderproduct/details/${productData.product.id}`);
            if (response) {
                setProduct(response.data);
                setCustomers(response.data.users); 
            }
        }
        faceProduct()
    }, [productData.product.id]);
    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMMM dd, yyyy 'at' h:mm a");
    };
    return (

        <>
            {
                product ?
                    <div className="p-2 bg-slate-50 rounded-lg">
                        <h2 className='text-3xl py-2 px-5 text-secondary'>3 reviews for Stylish Pink Coat</h2>
                        {
                            product.products.map((data, index) => {
                                const customer = customers?.find(c => c.id === data.customer_id);
                                return (
                                    <div className="p-4 rounded my-2 mx-8 flex gap-10" key={index}>
                                        <div className="">
                                            {
                                                customer?.photo_url ?
                                                    <img src={customer.photo_url} alt={customer.name} className="w-16 h-1w-16 mt-2 rounded-full" />
                                                    :
                                                    <div className="w-16 h-1w-16 mt-2 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-gray-700 font-bold">{customer?.name?.[0]}</span>
                                                    </div>
                                            }
                                        </div>
                                        <div className="">
                                            <span className="text-2xl text-primary">{customer?.name}</span>
                                            <p className='text-sm py-1 text-secondary'>{formatDate(data.created_at)}</p>
                                            <div className="flex gap-2 items-center">
                                                <StarRating
                                                    rating={data.star}
                                                />
                                                <p className=' text-secondary'>{data.star}</p>
                                            </div>
                                            <p className=" text-secondary">{data.review}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="">
                            <RatingForm
                                userid = {user}
                                product_id = {productData.product.id}
                            />
                        </div>
                    </div>
                    :
                    <h2 className='text-center text-xl py-5 text-red-500 font-bold'>No Product Review Available</h2>
            }
        </>
    )
}

export default Reviews;
