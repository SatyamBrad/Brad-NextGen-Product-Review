import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import "./star-component.css";

const StarRating = ({ ratings }) => {
    if (!ratings || ratings.length === 0) {
        return <p>No ratings available</p>;
    }

    const fullStars = Math.floor(ratings);
    const halfStar = ratings - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <FaStar key={index} color="#ffffff" />
                ))}
            {halfStar && <FaStarHalfAlt color="#ffffff" />}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <FaRegStar key={index} color="#ffffff" />
                ))}
        </div>
    );
};

export default StarRating;
