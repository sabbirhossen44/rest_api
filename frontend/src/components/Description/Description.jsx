import React from 'react'

const Description = ({productData}) => {
  return (
    <>
        <div className="p-2 bg-slate-50 rounded-lg">
            <h2 dangerouslySetInnerHTML={{__html:productData.product.long_desp}}></h2>
        </div>
    </>
  )
}

export default Description