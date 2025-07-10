import React from 'react'

const StarRating = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className="text-yellow-500 text-lg">
                {i <= rating ? '★' : '☆'}
            </span>
        );
    }
    return (
        <div className="flex gap-1">{stars}</div>
    )
}

export default StarRating