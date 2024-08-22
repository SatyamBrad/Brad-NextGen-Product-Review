export default function SettingsList({listColor, setListColor, listType, setListType, reviewsPerPage, setReviewsPerPage}) {
    return (
        <>
        <div className="settings-form-item">
          <label>Review List Star Color</label>
          <input
            type="color"
            name="bnpr_global-color-list_star_color"
            value={listColor}
            onChange={(e) => setListColor(e.target.value)}
          />
        </div>

        <div className="settings-form-item-col">
          <label>Select Review List Display Type</label>
          <div className="settings-list-type">
            <span>
              <input
                type="radio"
                name="bnpr_global-single_line_text_field-list_type"
                id="settings-list-type-1"
                value="block"
                checked={listType === "block"}
                onChange={() => {
                  setListType("block");
                }}
              />
              <label htmlFor="settings-list-type-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="none"
                  viewBox="0 0 150 150"
                >
                  <rect width="150" height="150" fill="#fefefe" rx="15" />
                  <rect
                    x="20"
                    y="20"
                    width="50"
                    height="50"
                    fill="#ccc"
                    rx="10"
                  />
                  <rect
                    x="80"
                    y="20"
                    width="50"
                    height="50"
                    fill="#ccc"
                    rx="10"
                  />
                  <rect
                    x="20"
                    y="80"
                    width="50"
                    height="50"
                    fill="#ccc"
                    rx="10"
                  />
                  <rect
                    x="80"
                    y="80"
                    width="50"
                    height="50"
                    fill="#ccc"
                    rx="10"
                  />
                </svg>
              </label>
            </span>
            <span>
              <input
                type="radio"
                name="bnpr_global-single_line_text_field-list_type"
                id="settings-list-type-2"
                value="list"
                checked={listType === "list"}
                onChange={() => {
                  setListType("list");
                }}
              />
              <label htmlFor="settings-list-type-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="none"
                  viewBox="0 0 150 150"
                >
                  <rect width="150" height="150" fill="#fefefe" rx="15" />
                  <rect
                    x="20"
                    y="20"
                    width="110"
                    height="30"
                    fill="#ccc"
                    rx="15"
                  />
                  <rect
                    x="20"
                    y="60"
                    width="110"
                    height="30"
                    fill="#ccc"
                    rx="15"
                  />
                  <rect
                    x="20"
                    y="100"
                    width="110"
                    height="30"
                    fill="#ccc"
                    rx="15"
                  />
                </svg>
              </label>
            </span>
          </div>
        </div>

        <div className="settings-form-item">
          <label>Number of reviews per page:</label>
          <input
            type="number"
            name="bnpr_global-number_integer-reviews_per_page"
            value={reviewsPerPage}
            onChange={(e) => {
              setReviewsPerPage(e.target.value);
            }}
          />
        </div>
        </>
    )
}