import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TitleBar } from "@shopify/app-bridge-react";
import ReviewComponent from "../components/ReviewComponent"

export const loader = async ({ request }) => {
  const formData = new FormData();
  formData.append("action", "FETCH_ALL");
  formData.append("shop", "bradnextgenwishlist.myshopify.com");

  const response = await fetch("https://adventures-thousand-pound-object.trycloudflare.com/api/reviews", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const fetchAllReviews = await response.json();
  return json(fetchAllReviews);
};

export default function Review() {
  const fetchAllReviews = useLoaderData();
  console.log(fetchAllReviews.data);
  return (
    <div className="review-container">
      <TitleBar title="Reviews" />
      <div className="review-list">
        {fetchAllReviews.data.map((item, index) => (
          <ReviewComponent key={index} item={item} />

        ))}
      </div>
    </div>
  );
}
