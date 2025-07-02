import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({title, link}) => {
    return (
        <>
            <div className="">
                <h2 className='font-bold text-5xl text-primary'><Link to={link}>{title}</Link></h2>
                <p className='text-secondary text-base py-2'><Link to='/'>Home</Link> {window.location.pathname
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