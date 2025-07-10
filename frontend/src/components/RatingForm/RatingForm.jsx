import React, { useState } from 'react';
import api from '../../Http';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ product_id, userid }) => {
    const navigate = useNavigate();
    const [star, setStar] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userid) {
            navigate('/login')
        }

        const reviewData = {
            star,
            comment,
            product_id,
            userid
        };

        try {
            const response = await api.post("/product/review", reviewData);
            if (response.data.status == true) {
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.data.message)
        }
        setStar(0);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-20 mt-6 p-4">
            <h2 className="text-3xl font-semibold text-primary mb-2">Add a review</h2>

            {/* Star Rating */}
            <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <span
                        key={i}
                        onClick={() => setStar(i)}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(0)}
                        className={`text-2xl cursor-pointer ${(hover || star) >= i ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                    >
                        ★
                    </span>
                ))}
            </div>

            {/* Comment Box */}
            <textarea
                className="w-full border rounded-md p-2 mb-3 outline-none"
                placeholder="Write Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                required
            />

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
            >
                Post Review
            </button>
        </form>
    );
};

export default ReviewForm;
