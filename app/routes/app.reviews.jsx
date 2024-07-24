import { TitleBar } from "@shopify/app-bridge-react";
import "../styles/review.css";
import ReviewComponent from "../components/ReviewComponent";
import { authenticate } from "../shopify.server";

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";



export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);


  const formData = new FormData();
  formData.append("action", "FETCH_ALL");
  formData.append("shop", "bradnextgenwishlist");

  const response = await fetch(
    "https://grams-necessarily-player-camcorders.trycloudflare.com/api/reviews",
    {
      method: "POST",
      body: formData,
    },
  );
  const data = await response.json();
  return json(data);

  // const fetchAllReviews = await db.review.findMany({
  //   where: {
  //     shop
  //   },
  //   include: {
  //     images: true,
  //   },
  // });
  // console.log(fetchAllReviews);


  // return json(fetchAllReviews);

};

export default function Review() {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className="review-container">
      <TitleBar title="Reviews" />

      <div className="review-list">
        {data.map((item, index) => (
          <ReviewComponent key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
