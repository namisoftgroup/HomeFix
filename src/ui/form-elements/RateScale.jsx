import React from "react";

function RateScale({ rate, handleRatingChange }) {
  return (
    <div className="stars">
      <div className="star-rating-service">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              type="radio"
              id={`star${star}`}
              name="rating"
              value={star}
              checked={rate === star}
              onChange={() => handleRatingChange(star)}
            />
            <label
              htmlFor={`star${star}`}
              title={`${star} stars`}
              className={rate >= star ? "active" : ""}
            >
              <i className="fa-sharp fa-solid fa-star"></i>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default RateScale;
