import React from 'react'

const Breadcrumbs = () => {
    return (
        <>
            <div className="">
                <h2 className='font-bold text-5xl text-primary'>Product</h2>
                <p className='text-secondary text-base py-2'>Home {window.location.pathname
                    .split('/')
                    .filter(Boolean)
                    .map((segment, index) => (
                        <span key={index}> &gt; {segment.charAt(0).toUpperCase() + segment.slice(1)}</span>
                    ))}
                </p>
            </div>
        </>
    )
}

export default Breadcrumbs