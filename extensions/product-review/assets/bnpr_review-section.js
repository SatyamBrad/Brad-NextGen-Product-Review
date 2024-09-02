// * All Constants

const shop = document
  .querySelector(".bnpr-review-section-container")
  .getAttribute("data-bnpr-shop");

const productId = document
  .querySelector(".bnpr-review-section-container")
  .getAttribute("data-bnpr-productId");

const backendApi = "https://publishers-marco-turkish-oldest.trycloudflare.com"

const filterOptions = {
  starRating: [],
  orderBy: "desc",
};

const attributes = JSON.parse(
  document
    .querySelector(".bnpr-review-section-attributes-container")
    ?.getAttribute("data-bnpr-attributes") || "{}",
);

const modal = document.querySelector(".bnpr-review-form-container");
const form = document.querySelector(".bnpr-review-form");
var uploadedImages = [];
const formStars = document.querySelectorAll(
  ".bnpr-review-form-rating .bnpr-star-container svg",
);

// * All Event Listeners

// form modal opening and closing handlers
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

// form stars clicking handler
formStars.forEach((star, index) => {
  star.addEventListener("click", () => {
    formStars.forEach((star) => {
      star.querySelector("rect").setAttribute("width", `0%`);
    });

    for (let i = 0; i <= index; i++) {
      formStars[i].querySelector("rect").setAttribute("width", `100%`);
    }
  });
});

// form image uploader handler
form
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

// form submission handler
form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    document.querySelector(".bnpr-loader").style.display = "block";
    document
      .querySelector(".bnpr-review-form-app")
      .classList.add("bnpr-disabled-div");
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

    const formData = new FormData(form);
    formData.append("action", "CREATE");
    uploadedImages.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch(backendApi + "/api/reviews", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.message);
    }

    console.log("Success:", data);
    renderNotification("Review submitted Successfully");
    form.reset();
    document.querySelector(".bnpr-loader").style.display = "";
    document
      .querySelector(".bnpr-review-form-app")
      .classList.remove("bnpr-disabled-div");
    modal.style.display = "none";

    init();
  } catch (err) {
    console.error(err);
    renderNotification(err.message);
    document.querySelector(".bnpr-loader").style.display = "";
    document
      .querySelector(".bnpr-review-form-app")
      .classList.remove("bnpr-disabled-div");
  }
});

// Form reset
form.addEventListener("reset", () => {
  formStars.forEach((star) => {
    star.querySelector("rect").setAttribute("width", `0%`);
  });
  uploadedImages = [];
  document.querySelector(
    ".bnpr-review-form-image .bnpr-image-preview",
  ).innerHTML = "";
});

// toggling the display of the filter options
document.querySelector(".bnpr-filter-btn").addEventListener("click", () => {
  const options = document.querySelector(".bnpr-filter-options");
  options.classList.toggle("bnpr-filter-options-display");
});

// selecting star rating filter option
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
    fetchReviewsWithFilters();
  });
});

// selecting order by filter option
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
    fetchReviewsWithFilters();
  });
});

// * All Function definations

const init = async () => {
  const body = new FormData();
  body.append("action", "FETCH_COUNT");
  body.append("shop", shop);
  body.append("productId", productId);
  const response = await fetch(backendApi + "/api/reviews", {
    method: "POST",
    body,
  });
  const fetchedData = await response.json();
  if (!fetchedData.ok) {
    console.error(fetchedData.message);
  }
  const { data } = fetchedData;
  if (data > 0) {
    await fetchReviewSummary();
    if (attributes.length > 0) {
      await fetchReviewAttributes();
    }
    displayReviewList(data);
  }
};
init();

const fetchReviewSummary = async () => {
  const body = new FormData();
  body.append("action", "FETCH_SUMMARY");
  body.append("shop", shop);
  body.append("productId", productId);
  const response = await fetch(backendApi + "/api/reviews", {
    method: "POST",
    body,
  });

  const fetchedData = await response.json();
  if (!fetchedData.ok) {
    console.error(fetchedData.message);
  }
  const { data } = fetchedData;
  document.querySelector(".bnpr-review-section-app").style.display = "flex";
  displaySummaryDetails(data);
  displaySummaryRatings(data);
};

const fetchReviewAttributes = async () => {
  const body = new FormData();
  body.append("action", "FETCH_ATTRIBUTES");
  body.append("shop", shop);
  body.append("productId", productId);
  attributes.map((item) => {
    body.append("attributes", item);
  });
  const response = await fetch(backendApi + "/api/reviews", {
    method: "POST",
    body,
  });
  const fetchedData = await response.json();
  if (!fetchedData.ok) {
    console.error(fetchedData.message);
  }
  const { data } = fetchedData;
  displaySummaryAttibutes(data);
};

const displaySummaryDetails = ({ summary }) => {
  const rating = parseFloat(summary?._avg?.starRating.toFixed(1));
  document.querySelector(".bnpr-summary-heading h1").innerHTML = rating;
  document.querySelector(".bnpr-summary-count span").innerHTML =
    summary?._count?.id;
  displaySummaryDetailsStars(rating);
};

const displaySummaryDetailsStars = (rating) => {
  var i = 1;
  // Fully fill the stars
  while (i <= Math.floor(rating)) {
    const clipRect = document.querySelector(
      `#bnpr-summary-star-clip-${i} rect`,
    );
    clipRect.setAttribute("width", `100%`);
    i++;
  }
  // Half fill a single star
  if (i <= 5) {
    const percentage = (rating - Math.floor(rating)) * 100;
    const clipRect = document.querySelector(
      `#bnpr-summary-star-clip-${i} rect`,
    );
    clipRect.setAttribute("width", `${percentage}%`);
    i++;
  }
  // Empty fill the stars
  while (i <= 5) {
    const clipRect = document.querySelector(
      `#bnpr-summary-star-clip-${i} rect`,
    );
    clipRect.setAttribute("width", `0%`);
    i++;
  }
};

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

const displaySummaryAttibutes = (data) => {
  data.forEach((item) => {
    const [key, value] = Object.entries(item)[0];
    const element = document
      .getElementById(`bnpr-review-section-attributes-${key}`)
      ?.querySelector(".bnpr-inner-bar");
    if (element) {
      element.style.width = `${(value / 4 - 0.25) * 100}%`;
    }
  });
};

const displayReviewList = (count) => {
  document.querySelector(".bnpr-filter-btn").style.display = "block";
  pageNavigationSetup(1, count);
};

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

const fetchReviews = async (pageNo) => {
  const reviewsPerPage =
    document
      .querySelector(".bnpr-review-section-list-container")
      .getAttribute("data-bnpr-reviewsPerPage") || 5;
  const body = new FormData();
  body.append("action", "FETCH_BY_PRODUCT");
  body.append("shop", shop);
  body.append("productId", productId);
  body.append("pageNo", pageNo);
  body.append("reviewsPerPage", reviewsPerPage);
  filterOptions.starRating.forEach((item) => {
    body.append("starRatingOption", item);
  });
  body.append("orderByOption", filterOptions.orderBy);
  const response = await fetch(backendApi + "/api/reviews", {
    method: "POST",
    body,
  });
  const { data } = await response.json();
  fillReviewList(data);
};

const fillReviewList = (data) => {
  const container = document.querySelector(".bnpr-list-container");
  container.innerHTML = "";
  const listType = container.getAttribute("data-bnpr-listType") || "list";
  container.classList.add(`bnpr-list-type-${listType}`);
  const starColor =
    document
      .querySelector(".bnpr-review-section-list-container")
      .getAttribute("data-bnpr-starColor") || "#FFD700";

  data.forEach((item) => {
    const reviewAuthor = document.createElement("div");
    reviewAuthor.classList.add("bnpr-review-author");
    reviewAuthor.innerText = item.customerName;

    const starContainer = document.createElement("div");
    starContainer.classList.add("bnpr-star-container");
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.classList.add("bnpr-star");
      if (i <= item.starRating) {
        star.innerHTML = `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <polygon fill="${starColor}" stroke="${starColor}" stroke-width="2" points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"/>
            </svg>`;
      } else {
        star.innerHTML = `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <polygon fill="none" stroke="${starColor}" stroke-width="2" points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2"/>
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
    if (item.images.length > 0) {
      imageContainer.classList.add("bnpr-image-container");

      item.images.forEach(({ imageUrl }) => {
        const img = document.createElement("img");
        img.classList.add("bnpr-image");
        img.src = imageUrl;
        imageContainer.appendChild(img);

        img.addEventListener("click", () => {
          window.open(imageUrl, "_blank");
        });
      });
    }

    const listItem = document.createElement("div");
    listItem.classList.add("bnpr-list-item");
    listItem.appendChild(reviewAuthor);
    listItem.appendChild(starContainer);
    listItem.appendChild(reviewTitle);
    listItem.appendChild(reviewDescription);
    listItem.appendChild(imageContainer);

    container.appendChild(listItem);
  });
};

const fetchReviewsWithFilters = async () => {
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

const renderNotification = (message) => {
  const notify = document.querySelector(".bnpr-review-notification-container");
  notify.style.display = "flex";
  notify.querySelector("h3").innerText = message;
  setTimeout(() => {
    notify.style.display = "none";
  }, 1500);
};
