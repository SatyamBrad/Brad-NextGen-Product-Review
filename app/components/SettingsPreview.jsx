import { useState } from "react";
import "../styles/settings-preview.css";
export default function SettingsPreview({
  formColor,
  summaryColor,
  hasAttribute,
  attributes,
}) {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [formRatings, setFormRatings] = useState(0);
  const [formImages, setFormImages] = useState([]);
  console.log(formImages);
  return (
    <div className="settings-preview">
      {isFormOpen && (
        <div className="settings-preview-form">
          <div className="settings-preview-form-app">
            <h1>Write a review</h1>

            <div
              className="settings-preview-form-item"
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <label htmlFor="preview-form-review-ratings">Ratings</label>
              <svg
                onClick={() => setFormRatings(1)}
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={formRatings >= 1 ? summaryColor : "none"}
                  stroke={summaryColor}
                  stroke-width="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
              <svg
                onClick={() => setFormRatings(2)}
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={formRatings >= 2 ? summaryColor : "none"}
                  stroke={summaryColor}
                  stroke-width="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
              <svg
                onClick={() => setFormRatings(3)}
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={formRatings >= 3 ? summaryColor : "none"}
                  stroke={summaryColor}
                  stroke-width="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
              <svg
                onClick={() => setFormRatings(4)}
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={formRatings >= 4 ? summaryColor : "none"}
                  stroke={summaryColor}
                  stroke-width="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
              <svg
                onClick={() => setFormRatings(5)}
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <polygon
                  fill={formRatings >= 5 ? summaryColor : "none"}
                  stroke={summaryColor}
                  stroke-width="2"
                  points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                />
              </svg>
            </div>

            <div className="settings-preview-form-item">
              <label htmlFor="preview-form-review-title">Title</label>
              <input type="text" id="preview-form-review-title" />
            </div>

            <div className="settings-preview-form-item">
              <label htmlFor="preview-form-review-description">Review</label>
              <textarea id="preview-form-review-description"></textarea>
            </div>

            <div className="settings-preview-form-item">
              <label htmlFor="preview-form-review-author">Your Name</label>
              <input type="text" id="preview-form-review-author" />
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
                    setFormImages((prev) => [...prev, ...filesArray]);
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </label>
                <div className="preview-form-review-preview-image">
                  {formImages?.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                    />
                  ))}
                </div>
              </div>
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
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    stroke-width="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
                <svg
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    stroke-width="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
                <svg
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    stroke-width="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
                <svg
                  class="star"
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
                    stroke-width="2"
                    points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"
                  />
                </svg>
                <svg
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill="none"
                    stroke={summaryColor}
                    stroke-width="2"
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
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    stroke-width="2"
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
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    stroke-width="2"
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
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    stroke-width="2"
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
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    stroke-width="2"
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
                  class="star"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <polygon
                    fill={summaryColor}
                    stroke={summaryColor}
                    stroke-width="2"
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
            {attributes.map((item) => (
              <div>
                <h2>{item.header}</h2>
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
        <button>filter</button>
        <button
          onClick={() => {
            setIsFormOpen(true);
          }}
        >
          Write a review
        </button>
      </div>
    </div>
  );
}
