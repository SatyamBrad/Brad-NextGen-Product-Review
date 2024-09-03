import { Form, useActionData } from "@remix-run/react";
import "../styles/reviews.css";
import { useEffect, useState } from "react";

export default function Reviews({ fetchAllReviews }) {
  const actionData = useActionData();
  const [checkedItems, setCheckedItems] = useState([]);
  const [formAction, setFormAction] = useState("");

  useEffect(() => {
    setCheckedItems([]);
  }, [actionData]);

  const handleTimeShow = (t) => {
    const time = new Date(t);
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][time.getMonth()];
    const date = time.getDate();
    const hours = time.getHours();
    const finalHours = hours > 12 ? hours - 12 : hours;
    const m = time.getMinutes();
    const mins = m < 10 ? "0" + m : m;
    const isAmOrPm = hours > 12 ? "PM" : "AM";
    return `${month} ${date} at ${finalHours}:${mins} ${isAmOrPm}`;
  };
  const findStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "#baffb4";
      case "Unpublished":
        return "#ff6363";
      default:
        return "#ccc";
    }
  };

  return (
    <div className="reviews-container">
      <div className="reviews-navbar">
        <Form action="/app/dashboard" method="POST">
          {checkedItems.map((item) => (
            <input key={item} type="hidden" name="id" value={item} />
          ))}

          <input type="hidden" name="action" value={formAction} />
          <button onClick={() => setFormAction("publish")}>Publish</button>
          <button onClick={() => setFormAction("unpublish")}>Unpublish</button>
          <button onClick={() => setFormAction("delete")}>Delete</button>
        </Form>
      </div>

      <div className="reviews-content">
        {fetchAllReviews.map((review, index) => (
          <div key={index} className="reviews-item">
            <span className="checkbox-container">
              <input
                id={`selected-review-item-${index}`}
                type="checkbox"
                onClick={() => {
                  if (checkedItems.includes(review.id)) {
                    setCheckedItems((prev) =>
                      prev.filter((item) => item != review.id),
                    );
                  } else {
                    setCheckedItems((prev) => [...prev, review.id]);
                  }
                }}
              />
              <label
                htmlFor={`selected-review-item-${index}`}
                className="checkbox"
              >
                {checkedItems.includes(review.id) && (
                  <label
                    htmlFor={`selected-review-item-${index}`}
                    className="inner-checkbox"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="black"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </label>
                )}
              </label>
            </span>
            <div className="reviews-item-product-image">
              <img src={review.productImage} alt={review.productId} />
            </div>
            <div className="reviews-item-description">
              <span
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <span className="star-container">
                  {[...Array(review.starRating)].map((_, i) => (
                    <span key={i}>
                      <svg
                        className="star"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <polygon
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                        />
                      </svg>
                    </span>
                  ))}
                  {[...Array(5 - review.starRating)].map((_, i) => (
                    <span key={index}>
                      <svg
                        className="star"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <polygon
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                        />
                      </svg>
                    </span>
                  ))}
                </span>

                <span
                  className="status"
                  style={{ backgroundColor: findStatusColor(review.status) }}
                >
                  {review.status}
                </span>
              </span>

              {review.reviewTitle && (
                <h3 className="review-title">{review.reviewTitle}</h3>
              )}

              <span
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                }}
              >
                <h2 className="review-author">{review.customerName}</h2>
                <span className="date-time">
                  {handleTimeShow(review.createdAt)}
                </span>
              </span>

              {review.reviewDescription && <p className="review-description">{review.reviewDescription}</p>}

              {review.images.length > 0 && (
                <span className="image-container">
                  {review.images.map(({ imageUrl }) => (
                    <img src={imageUrl} />
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}

        {fetchAllReviews.length === 0 && <div>No reviews yet...</div>}
      </div>
    </div>
  );
}
