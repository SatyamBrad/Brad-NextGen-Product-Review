import { useState } from "react";
import "../styles/settings-preview.css";
export default function SettingsPreview({
  formColor,
  summaryColor,
  listColor,
  hasAttribute,
  attributes,
  listType,
  reviewsPerPage,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [demoReview, setDemoReview] = useState({
    starRating: 0,
    reviewTitle: "",
    reviewDescription: "",
    reviewAuthor: "",
    imageUrls: [],
    attributes: {},
  });

  const [demoReviewsList, setDemoReviewsList] = useState([
    {
      starRating: 3,
      reviewTitle: "Good Product",
      reviewDescription: "Not upto the mark, but the color is nice.",
      reviewAuthor: "Satyam Jharbade",
      imageUrls: [
        "https://res.cloudinary.com/brad-shaunak/image/upload/v1724748545/review-images-demo/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6_fcjbmi.webp",
      ],
      attributes: [{ quality: 5 }, { sizing: 3 }],
    },
    {
      starRating: 5,
      reviewTitle: "Excellent Product",
      reviewDescription:
        "Never seen any other product better than this. Would recommend it to anyone who uses it. The quality and color checks all the requirements for it to be a top quality product.",
      reviewAuthor: "Shaunak Chandra",
      imageUrls: [
        "https://res.cloudinary.com/brad-shaunak/image/upload/v1724748545/review-images-demo/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d_qdrlrl.webp",
      ],
      attributes: [{ quality: 5 }, { sizing: 3 }],
    },
  ]);

  const [currReviewPage, setCurrReviewPage] = useState(0);

  // console.log(Math.floor  (demoReviewsList.length / reviewsPerPage))

  return (
    <div className="settings-preview">
      {isFormOpen && (
        <div className="settings-preview-form">
          <div className="settings-preview-form-app">
            <div
              onClick={() => {
                setIsFormOpen(false);
              }}
              className="close-form-btn"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="white" />
                <line
                  x1="9"
                  y1="9"
                  x2="15"
                  y2="15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLineCap="round"
                />
                <line
                  x1="9"
                  y1="15"
                  x2="15"
                  y2="9"
                  stroke="black"
                  strokeWidth="2"
                  strokeLineCap="round"
                />
              </svg>
            </div>

            <h1>Write a review</h1>

            <div
              className="settings-preview-form-item"
              style={{
                display: "flex",
                gap: "0.3rem",
                alignItems: "center",
              }}
            >
              <label htmlFor="preview-form-review-ratings">Ratings</label>
              <svg
                onClick={() =>
                  setDemoReview((prev) => ({ ...prev, starRating: 1 }))
                }
                className="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={demoReview.starRating >= 1 ? formColor : "none"}
                  stroke={formColor}
                  strokeWidth="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
              <svg
                onClick={() =>
                  setDemoReview((prev) => ({ ...prev, starRating: 2 }))
                }
                className="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={demoReview.starRating >= 2 ? formColor : "none"}
                  stroke={formColor}
                  strokeWidth="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
              <svg
                onClick={() =>
                  setDemoReview((prev) => ({ ...prev, starRating: 3 }))
                }
                className="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={demoReview.starRating >= 3 ? formColor : "none"}
                  stroke={formColor}
                  strokeWidth="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
              <svg
                onClick={() =>
                  setDemoReview((prev) => ({ ...prev, starRating: 4 }))
                }
                className="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={demoReview.starRating >= 4 ? formColor : "none"}
                  stroke={formColor}
                  strokeWidth="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
              <svg
                onClick={() =>
                  setDemoReview((prev) => ({ ...prev, starRating: 5 }))
                }
                className="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={demoReview.starRating >= 5 ? formColor : "none"}
                  stroke={formColor}
                  strokeWidth="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
            </div>

            <div className="settings-preview-form-item">
              <label htmlFor="preview-form-review-title">Title</label>
              <input
                type="text"
                id="preview-form-review-title"
                value={demoReview.reviewTitle}
                onChange={(event) => {
                  setDemoReview((prev) => ({
                    ...prev,
                    reviewTitle: event.target.value,
                  }));
                }}
              />
            </div>

            <div className="settings-preview-form-item">
              <label htmlFor="preview-form-review-description">Review</label>
              <textarea
                rows={5}
                id="preview-form-review-description"
                onChange={(event) => {
                  setDemoReview((prev) => ({
                    ...prev,
                    reviewDescription: event.target.value,
                  }));
                }}
                value={demoReview.reviewDescription}
              ></textarea>
            </div>

            <div className="settings-preview-form-item">
              <label htmlFor="preview-form-review-author">Your Name</label>
              <input
                type="text"
                id="preview-form-review-author"
                onChange={(event) => {
                  setDemoReview((prev) => ({
                    ...prev,
                    reviewAuthor: event.target.value,
                  }));
                }}
              />
            </div>

            <div className="settings-preview-form-item">
              <label>Upload Images(Optional)</label>
              <div style={{ display: "flex" }}>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="preview-form-review-upload-images"
                  multiple
                  onChange={(e) => {
                    const filesArray = Array.from(e.target.files);
                    setDemoReview((prev) => ({
                      ...prev,
                      imageUrls: [...prev.imageUrls, ...filesArray],
                    }));
                  }}
                />
                <label
                  htmlFor="preview-form-review-upload-images"
                  className="upload-image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLineCap="round"
                    strokeLineJoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </label>
                <div className="preview-form-review-preview-image">
                  {demoReview.imageUrls.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {attributes?.map((item, index) => (
              <div key={index} className="settings-preview-form-item">
                <label>{item.header?.toUpperCase()}</label>
                <div className="settings-preview-form-attributes">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <>
                      <input
                        name={`attribute-${index}`}
                        type="radio"
                        id={`attribute-${index}-button-${i}`}
                        onChange={(event) => {
                          setDemoReview((prev) => ({
                            ...prev,
                            attributes: {
                              ...prev.attributes,
                              [item.header]: i,
                            },
                          }));
                        }}
                      />
                      <label htmlFor={`attribute-${index}-button-${i}`}>
                        <svg height="10" width="10">
                          <circle cx="5" cy="5" r="5" fill="black" />
                        </svg>
                      </label>
                    </>
                  ))}
                  <span className="label start-label">{item.start}</span>
                  {item.type === "centered_range" && (
                    <span className="label mid-label">{item.mid}</span>
                  )}
                  <span className="label end-label">{item.end}</span>
                </div>
              </div>
            ))}

            <div className="settings-preview-form-item">
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setDemoReviewsList((prev) => [
                    ...prev,
                    {
                      ...demoReview,
                      imageUrls: demoReview.imageUrls.map((item) =>
                        URL.createObjectURL(item),
                      ),
                    },
                  ]);
                }}
                className="settings-preview-submit-form"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <h1>Customer Reviews</h1>

      <div className="settings-preview-summary">
        <div className="settings-preview-summary-details">
          <div className="summary-details">
            <div>
              <h1>4.2</h1>
            </div>
            <div>
              <div className="summary-star-container">
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                  <rect x="12" y="0" width="12" height="24" fill="white" />
                  <polygon
                    fill="none"
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill="none"
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
              </div>
              <p>Based on 45 reviews</p>
            </div>
          </div>

          <div className="summary-ratings">
            <div>
              <span>5</span>
              <span>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
              </span>
              <span className="bar">
                <span className="inner-bar" style={{ width: "50%" }}></span>
              </span>
              <span>21</span>
            </div>

            <div>
              <span>4</span>
              <span>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
              </span>
              <span className="bar">
                <span className="inner-bar" style={{ width: "26%" }}></span>
              </span>
              <span>12</span>
            </div>
            <div>
              <span>3</span>
              <span>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
              </span>
              <span className="bar">
                <span className="inner-bar" style={{ width: "15%" }}></span>
              </span>
              <span>7</span>
            </div>
            <div>
              <span>2</span>
              <span>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
              </span>
              <span className="bar">
                <span className="inner-bar" style={{ width: "8%" }}></span>
              </span>
              <span>4</span>
            </div>
            <div>
              <span>1</span>
              <span>
                <svg
                  className="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    strokeWidth="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
              </span>
              <span className="bar">
                <span className="inner-bar" style={{ width: "5%" }}></span>
              </span>
              <span>1</span>
            </div>
          </div>
        </div>

        {hasAttribute && (
          <div className="settings-preview-summary-attributes">
            <h1>100% people would recommend this</h1>
            {attributes.map((item, index) => (
              <div key={index}>
                <h2>{item.header?.toUpperCase()}</h2>
                <div className="bar">
                  <div className="inner-bar">
                    <div className="slider"></div>
                  </div>
                  <div className="label start-label">{item.start}</div>

                  {item.type === "centered_range" && (
                    <div className="label mid-label">{item.mid}</div>
                  )}
                  <div className="label end-label">{item.end}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="settings-preview-buttons">
        <button onClick={() => setIsFilterOpen((prev) => !prev)}>Filter</button>
        <button
          onClick={() => {
            setIsFormOpen(true);
          }}
        >
          Write a review
        </button>
      </div>

      {isFilterOpen && (
        <div className="settings-preview-filter">
          <div className="settings-preview-filter-item">
            <label>Ratings</label>
            {[1, 2, 3, 4, 5].map((item) => (
              <span key={item} className="settings-preview-filter-option">
                {item}
                {[...Array(item)].map((_, index) => (
                  <svg
                    key={index}
                    className="star"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="8"
                    height="8"
                  >
                    <polygon
                      fill="black"
                      stroke="black"
                      strokeWidth="2"
                      points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                    />
                  </svg>
                ))}
              </span>
            ))}
          </div>
          <div className="settings-preview-filter-item">
            <label>Order By</label>
            {["Latest First", "Oldest First"].map((item, index) => (
              <span className="settings-preview-filter-option" key={index}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={`settings-preview-list list-type-${listType}`}>
        {demoReviewsList
          .slice(
            currReviewPage * reviewsPerPage,
            currReviewPage * reviewsPerPage + reviewsPerPage,
          )
          .map((item) => (
            <div className="settings-preview-list-item">
              <div className="review-details">
                <div className="review-author">
                  <h3>{item.reviewAuthor?.toUpperCase()}</h3>
                </div>

                <div className="star-container">
                  {[...Array(item.starRating)].map((_, index) => (
                    <span key={index}>
                      <svg
                        className="star"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                      >
                        <polygon
                          fill={listColor}
                          stroke={listColor}
                          strokeWidth="2"
                          points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                        />
                      </svg>
                    </span>
                  ))}
                  {[...Array(5 - item.starRating)].map((_, index) => (
                    <span>
                      <svg
                        className="star"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                      >
                        <polygon
                          fill="none"
                          stroke={listColor}
                          strokeWidth="2"
                          points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                        />
                      </svg>
                    </span>
                  ))}
                </div>

                <div className="review-title">
                  <b>{item.reviewTitle}</b>
                </div>

                <div className="review-description">
                  <p>{item.reviewDescription}</p>
                </div>

                <div className="image-container">
                  {item.imageUrls.map((image) => (
                    <img src={image} />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="settings-preview-page-navigation">
        {[...Array(Math.ceil(demoReviewsList.length / reviewsPerPage))].map(
          (_, index) => (
            <span key={index} onClick={() => setCurrReviewPage(index)}>
              {index + 1}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
