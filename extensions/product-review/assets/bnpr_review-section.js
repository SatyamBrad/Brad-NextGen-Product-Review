// * All Constants

const shop = document
  .querySelector(".bnpr-review-section-container")
  .getAttribute("data-bnpr-shop");

const productId = document
  .querySelector(".bnpr-review-section-container")
  .getAttribute("data-bnpr-productId");

const backendApi = document
  .querySelector(".bnpr-review-section-container")
  .getAttribute("data-bnpr-backendApi");

const starColor = document
  .querySelector(".bnpr-review-section-container")
  .getAttribute("data-bnpr-starColor");

const filterOptions = {
  starRating: [],
  orderBy: "desc",
};

const modal = document.querySelector(".bnpr-review-form-container");
const form = document.querySelector(".bnpr-review-form");
var uploadedImages = [];
const formStars = document.querySelectorAll(
  ".bnpr-review-form-rating .bnpr-star-container .bnpr-star polygon",
);

// * All Event Listeners

/**
 * Handles the modal appearing and dissapearing. Window onClick function removes the modal
 * if clicked outside of the modal.
 * This only works if the loader is inactive else if the loader is active then the modal
 * does not dissapear (unless the form submits).
 */
document.querySelector(".bnpr-open-form-btn").addEventListener("click", () => {
  modal.style.display = "flex";
});

document.querySelector(".bnpr-close-form-btn").addEventListener("click", () => {
  const loaderStyle = document.querySelector(".bnpr-loader").style.display;
  if (loaderStyle === "") modal.style.display = "none";
});

window.onclick = function (event) {
  const loaderStyle = document.querySelector(".bnpr-loader").style.display;
  if (loaderStyle === "" && event.target == modal) {
    modal.style.display = "none";
  }
};

/**
 * Event listener to fill the stars inside the form. The stars are filled as such that
 * all other stars before the currently clicked one are also selected. For eg, if the
 * nth star is selected then all stars from 1 to n are filled.
 * Used variables: formStars
 */
formStars.forEach((star, index) => {
  star.parentNode.addEventListener("click", () => {
    // Clears the existing rating.
    formStars.forEach((s) => {
      s.style.fill = "";
    });
    // Fills the new rating.
    for (let i = 0; i <= index; i++) {
      formStars[i].style.fill = starColor;
    }
  });
});

/**
 * Event listener to store the uploded images from the form into a separate container
 * to send during form submission and show the uploaded images by creating a temporary
 * URL to the file object and using that URL in an img tag
 * Used Variables: uploadedImages
 */
document
  .querySelector("#bnpr-review-upload-image")
  .addEventListener("change", (event) => {
    const images = event.target.files;
    const imagePreview = document.querySelector(
      ".bnpr-review-form-image .bnpr-image-preview",
    );

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      // store the image file in another container for form submission.
      uploadedImages.push(image);
      // Creates a temporary URL representing the given file object.
      const imageURL = URL.createObjectURL(image);

      // div > img + deleteBtn
      const div = document.createElement("div");

      const img = document.createElement("img");
      img.src = imageURL;
      div.appendChild(img);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("bnpr-review-image-delete-btn");
      deleteBtn.innerHTML = "&times;";
      deleteBtn.onclick = function () {
        div.remove();
        // Filters out the current image
        uploadedImages = uploadedImages.filter((item, index) => index !== i);
      };
      div.appendChild(deleteBtn);

      imagePreview.appendChild(div);
    }

    // Clears the event listener so that it can always detect a change.
    event.target.value = "";
  });

/**
 * Form Submission
 * Used variables: form, uploadedImages, backendApi, modal
 * Used Functions: renderNotifications(), fetchSummary(), fetchReviewSummaryOnBlock()
 */
form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    // Activates the Loader.
    document.querySelector(".bnpr-loader").style.display = "block";
    // Disables the form section so that no changes can be done to it during submission.
    document
      .querySelector(".bnpr-review-form-app")
      .classList.add("bnpr-disabled-div");

    // Checks for star rating input and throws error if empty
    const starRatingInputs = form.querySelectorAll('input[name="starRating"]');
    let isAnyChecked = false;

    starRatingInputs.forEach((input) => {
      if (input.checked) {
        isAnyChecked = true;
      }
    });

    if (!isAnyChecked) {
      throw new Error("Please select a star rating.");
    }

    // Creates a FormData.
    const formData = new FormData(form);
    // CREATE action is added to notify the backend that the user wants to add data.
    formData.append("action", "CREATE");
    // Uploads the images into the FormData. Appending all the images into the same key
    // puts all the images into a list[] format
    uploadedImages.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch(backendApi + "/api/reviews", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    // Handles any kind of error coming from the backend.
    if (!data.ok) {
      throw new Error(data.message);
    }

    console.log("Success:", data);
    renderNotification("Review submitted Successfully");

    // Resets the form.
    form.reset();
    // Removes the loader.
    document.querySelector(".bnpr-loader").style.display = "";
    // Removes the disabled form.
    document
      .querySelector(".bnpr-review-form-app")
      .classList.remove("bnpr-disabled-div");
    // Removes the modal.
    modal.style.display = "none";
    // Re-fetches the summary of the reviews of the product so as to see the changes
    // uploaded by the review (Subject to change)
    fetchSummary();
    // fetchReviewSummaryOnBlock();
  } catch (err) {
    console.error(err);
    renderNotification(err.message);
    // Removes the loader.
    document.querySelector(".bnpr-loader").style.display = "";
    // Removes the disabled form.
    document
      .querySelector(".bnpr-review-form-app")
      .classList.remove("bnpr-disabled-div");
  }
});

/**
 * Form Reset
 * Used Variables: form, formStars
 */
form.addEventListener("reset", () => {
  // Clears all the filled stars in the form
  formStars.forEach((s) => {
    s.style.fill = "";
  });
  // Clears all the uploaded images container and its preview
  uploadedImages = [];
  document.querySelector(
    ".bnpr-review-form-image .bnpr-image-preview",
  ).innerHTML = "";
});

document.querySelector(".bnpr-filter-btn").addEventListener("click", () => {
  const options = document.querySelector(".bnpr-filter-options");
  options.classList.toggle("bnpr-filter-options-display");
});

document.querySelectorAll("#bnpr-filter-options-ratings li").forEach((item) => {
  item.addEventListener("click", () => {
    const value = item.getAttribute("data-bnpr-value");
    if (filterOptions.starRating.includes(value)) {
      item.classList.remove("bnpr-filter-options-selected");
      filterOptions.starRating = filterOptions.starRating.filter(
        (i) => i != value,
      );
    } else {
      item.classList.add("bnpr-filter-options-selected");
      filterOptions.starRating.push(value);
    }
    document
      .querySelector(".bnpr-filter-options")
      .classList.remove("bnpr-filter-options-display");
    fetchSummaryWithOptions();
  });
});

document.querySelectorAll("#bnpr-filter-options-orderBy li").forEach((item) => {
  item.addEventListener("click", () => {
    const value = item.getAttribute("data-bnpr-value");
    if (value !== filterOptions.orderBy) {
      document
        .querySelectorAll("#bnpr-filter-options-orderBy li")
        .forEach((item) => {
          item.classList.remove("bnpr-filter-options-selected");
        });

      item.classList.add("bnpr-filter-options-selected");
      filterOptions.orderBy = value;
    }
    document
      .querySelector(".bnpr-filter-options")
      .classList.remove("bnpr-filter-options-display");
    fetchSummaryWithOptions();
  });
});

// * All Function definations

/**
 * fetchSummary() function is the first function that runs on app load.
 * Used Functions: displaySummaryDetails(), displaySummaryRatings(),
 *                 displaySummarySliders(), pageNavigationSetup()
 */

const fetchSummary = async () => {
  // FETCH_SUMMARY action is used to denote the backend that the user
  // wants to fetch the summary of the product
  const body = new FormData();
  body.append("action", "FETCH_SUMMARY");
  body.append("shop", shop);
  body.append("productId", productId);
  const response = await fetch(backendApi + "/api/reviews", {
    method: "POST",
    body,
  });

  const { data } = await response.json();
  // console.log(data)

  // If there is some data then only do the following things
  // display summary section + sllider section -> display the filter button
  // and give it style -> setup page navigation which in turn sets up the list
  if (data?.summary?._count?.id !== 0) {
    document.querySelector(".bnpr-review-section-app").style.display = "flex";
    displaySummaryDetails(data);
    displaySummaryRatings(data);
    displaySummarySliders(data);

    document.querySelector(".bnpr-filter-btn").style.display = "block";
    document.querySelector(
      ".bnpr-review-section-list-buttons",
    ).style.justifyContent = "space-between";

    pageNavigationSetup(1, data?.summary?._count?.id);
  }
};

/**
 * displaySummaryDetails() function displays the details of the summary section
 * including the the avgerage rating of the product and the total reviews.
 * It calls another function to display the average summary in stars
 * Used functions: displayStars()
 */
const displaySummaryDetails = ({ summary }) => {
  const rating = parseFloat(summary?._avg?.starRating.toFixed(1));
  document.querySelector(".bnpr-summary-heading h1").innerHTML = rating;
  document.querySelector(".bnpr-summary-count span").innerHTML =
    summary?._count?.id;
  displaySummaryDetailsStars(rating);
};

/**
 * displaySummaryDetailsStars() function displays the average summary in stars
 */
const displaySummaryDetailsStars = (rating) => {
  var i = 1;
  // Fully fill the stars
  while (i <= Math.floor(rating)) {
    const clipRect = document.querySelector(`#bnpr-star-clip-${i} rect`);
    clipRect.setAttribute("width", `100%`);
    i++;
  }
  // Half fill a single star
  if (i <= 5) {
    const percentage = (rating - Math.floor(rating)) * 100;
    const clipRect = document.querySelector(`#bnpr-star-clip-${i} rect`);
    clipRect.setAttribute("width", `${percentage}%`);
    i++;
  }
  // Empty fill the stars
  while (i <= 5) {
    const clipRect = document.querySelector(`#bnpr-star-clip-${i} rect`);
    clipRect.setAttribute("width", `0%`);
    i++;
  }
};

/**
 * displaySummaryRatings() function display the number of reviews per star.
 * This includes displaying the number of reviews and percentage of that number
 * over the total reviews per star rating.
 */
const displaySummaryRatings = ({ summary, ratings }) => {
  // For every available rating coming from backend we run this code
  // The rest are untouched and it reverts to its default state
  ratings.forEach((item) => {
    const index = item?.starRating;
    // Changes the width of the inner bar
    // [no. of reviews for that star / total reviews] * 100%
    document.querySelector(
      `.bnpr-review-section-ratings-container .bnpr-bar #bnpr-inner-bar-${index}`,
    ).style.width = `${(item?._count?.id / summary?._count?.id) * 100}%`;
    // Displays the number of reviews for that star
    document.querySelector(
      `.bnpr-review-section-ratings-container #bnpr-val-count-${index}`,
    ).innerHTML = item?._count?.id;
  });
};

/**
 * displaySummarySliders() functions adjusts the width of the inner bars of the sliders
 */
const displaySummarySliders = ({ sliders }) => {
  document
    .getElementById("bnpr-review-section-slider-quality")
    .querySelector(".bnpr-inner-bar").style.width = `${sliders.quality * 100}%`;
  document
    .getElementById("bnpr-review-section-slider-sizing")
    .querySelector(".bnpr-inner-bar").style.width = `${sliders.sizing * 100}%`;
};

/**
 * fetchSummaryWithOptions() function is called when the filter options are used
 * returns the total count of reviews matching the filter which is used by pageNavigationSetup()
 * Used functions: pageNavigationSetup()
 * Used variables: filterOptions
 */
const fetchSummaryWithOptions = async () => {
  const body = new FormData();
  body.append("shop", shop);
  body.append("productId", productId);
  body.append("action", "FETCH_COUNT");
  filterOptions.starRating.forEach((item) => {
    body.append("starRatingOption", item);
  });
  body.append("orderByOption", filterOptions.orderBy);
  const response = await fetch(backendApi + "/api/reviews", {
    method: "POST",
    body,
  });
  const data = await response.json();
  if (data?.data > 0) {
    pageNavigationSetup(1, data?.data);
  } else {
    document.querySelector(".bnpr-list-container").innerText =
      "No review match such filter.";
    document.querySelector(".bnpr-page-nav-container").innerText = "";
  }
};

/**
 * pageNavigationSetup() function sets the page navigation system
 * It calls itself recursively when the user clicks on a certain page
 * fetches the current page reviews -> sets up the navigation system around the current page
 */
const pageNavigationSetup = async (currentPage, totalReviews) => {
  const createPageButton = (index, text) => {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.addEventListener("click", (e) => {
      pageNavigationSetup(index, totalReviews);
      document
        .querySelector(".bnpr-list-container")
        .scrollIntoView({ behavior: "smooth" });
    });
    if (index === currentPage) {
      button.disabled = true;
    }
    container.appendChild(button);
  };

  await fetchReviews(currentPage);
  const totalPages = Math.ceil(totalReviews / 5);
  const container = document.querySelector(".bnpr-page-nav-container");
  container.innerHTML = "";
  if (totalPages <= 1) return;

  if (currentPage !== 1) {
    createPageButton(
      currentPage - 1,
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>`,
    );
  }

  if (currentPage > 3) {
    createPageButton(1, 1);
    const span = document.createElement("span");
    span.innerText = "...";
    container.appendChild(span);
  }

  for (
    let index = Math.max(1, currentPage - 2);
    index <= Math.min(totalPages, currentPage + 2);
    index++
  ) {
    createPageButton(index, index);
  }

  if (currentPage < totalPages - 2) {
    const span = document.createElement("span");
    span.innerText = "...";
    container.appendChild(span);
    createPageButton(totalPages, totalPages);
  }

  if (currentPage !== totalPages) {
    createPageButton(
      currentPage + 1,
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>`,
    );
  }
};

/**
 * fetchReviews() function fetches the reviews for the specific page number
 * Used functions: fillReviewList()
 */
const fetchReviews = async (pageNo) => {
  const body = new FormData();
  body.append("action", "FETCH_BY_PRODUCT");
  body.append("shop", shop);
  body.append("productId", productId);
  body.append("pageNo", pageNo);
  filterOptions.starRating.forEach((item) => {
    body.append("starRatingOption", item);
  });
  body.append("orderByOption", filterOptions.orderBy);
  const response = await fetch(backendApi + "/api/reviews", {
    method: "POST",
    body,
  });
  const { data } = await response.json();
  const container = document.querySelector(".bnpr-list-container");
  container.innerHTML = "";
  fillReviewList(container, data);
};

/**
 * fillReviewList() function populates the screen with the fetched reviews.
 */
const fillReviewList = (container, data) => {
  data.forEach((item) => {
    const userDetails = document.createElement("div");
    userDetails.classList.add("bnpr-user-details");
    if (item.customerId === "Guest" && item.customerName === "Anonymous") {
      userDetails.innerHTML = "Guest";
    } else {
      userDetails.innerHTML = item.customerName.toUpperCase();
    }

    const starContainer = document.createElement("div");
    starContainer.classList.add("bnpr-star-container");
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("div");
      star.classList.add("bnpr-star");
      if (i <= item.starRating) {
        star.innerHTML = `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <polygon fill="${starColor}" stroke="${starColor}" stroke-width="2" points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"/>
            </svg>`;
      } else {
        star.innerHTML = `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <polygon fill="none" stroke="{{ starColor }}" stroke-width="2" points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"/>
            </svg>`;
      }
      starContainer.appendChild(star);
    }
    const reviewTitle = document.createElement("div");
    reviewTitle.innerHTML = item.reviewTitle;
    reviewTitle.classList.add("bnpr-review-title");

    const reviewDescription = document.createElement("div");
    reviewDescription.innerHTML = item.reviewDescription;
    reviewDescription.classList.add("bnpr-review-description");

    const imageContainer = document.createElement("div");
    if (item.images.length !== 0) {
      imageContainer.classList.add("bnpr-image-container");

      item.images.forEach((image) => {
        const img = document.createElement("img");
        img.classList.add("bnpr-image");
        img.src = image?.imageUrl;
        imageContainer.appendChild(img);
      });
    }
    const header = document.createElement("div");
    header.classList.add("bnpr-list-item-header");
    header.appendChild(userDetails);

    const body = document.createElement("div");
    body.classList.add("bnpr-list-item-body");
    body.appendChild(starContainer);
    body.appendChild(reviewTitle);
    body.appendChild(reviewDescription);
    body.appendChild(imageContainer);

    const listItem = document.createElement("div");
    listItem.classList.add("bnpr-list-item");
    listItem.appendChild(header);
    listItem.appendChild(body);

    container.appendChild(listItem);
  });
};

/**
 * renderNotification() function notifies the user about any success message or error message
 */
const renderNotification = (message) => {
  const notify = document.querySelector(".bnpr-review-notification-container");
  notify.style.display = "flex";
  notify.querySelector("h3").innerText = message;
  setTimeout(() => {
    notify.style.display = "none";
  }, 1500);
};

// * All function calls

fetchSummary();
