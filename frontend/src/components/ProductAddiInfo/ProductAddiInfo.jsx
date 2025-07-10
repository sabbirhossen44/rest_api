import React from 'react'

const ProductAddiInfo = ({ productData }) => {
    return (
        <>
            <div className="p-2 bg-slate-50 rounded-lg">
                {
                    productData.product.addi_info ?
                        <h2 dangerouslySetInnerHTML={{ __html: productData.product.addi_info }}></h2>
                        :
                        <h2 className='text-center text-xl py-5 text-red-500 font-bold'>No ProductAddiInfo Available</h2>
                }

            </div>
        </>
    )
}

export default ProductAddiInfo