import { TitleBar } from "@shopify/app-bridge-react";
import "../styles/review.css";
import ReviewComponent from "../components/ReviewComponent";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

// const data = [
//   {
//     heading: "Cool sheets",
//     checked: true,
//     author: "Brenda H.",
//     verified: true,
//     time: "May 11 at 09:00 am",
//     status: "pending",
//     review:
//       "They're the first what actually work to keep up comfortable all night",
//   },
//   {
//     heading: "Cool sheets",
//     checked: false,
//     author: "Brenda H.",
//     verified: true,
//     time: "May 11 at 09:00 am",
//     status: "pending",
//     review:
//       "They're the first what actually work to keep up comfortable all night",
//   },
//   {
//     heading: "Cool sheets",
//     checked: false,
//     author: "Brenda H.",
//     verified: true,
//     time: "May 11 at 09:00 am",
//     status: "pending",
//     review:
//       "They're the first what actually work to keep up comfortable all night",
//   },
//   {
//     heading: "Cool sheets",
//     checked: false,
//     author: "Brenda H.",
//     verified: true,
//     time: "May 11 at 09:00 am",
//     status: "pending",
//     review:
//       "They're the first what actually work to keep up comfortable all night",
//   },
//   {
//     heading: "Cool sheets",
//     checked: false,
//     author: "Brenda H.",
//     verified: true,
//     time: "May 11 at 09:00 am",
//     status: "pending",
//     review:
//       "They're the first what actually work to keep up comfortable all night",
//   },
//   {
//     heading: "Cool sheets",
//     checked: false,
//     author: "Brenda H.",
//     verified: true,
//     time: "May 11 at 09:00 am",
//     status: "pending",
//     review:
//       "They're the first what actually work to keep up comfortable all night",
//   },
//   {
//     heading: "Cool sheets",
//     checked: false,
//     author: "Brenda H.",
//     verified: true,
//     time: "May 11 at 09:00 am",
//     status: "pending",
//     review:
//       "They're the first what actually work to keep up comfortable all night",
//   },
// ];

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const formData = new FormData();
  formData.append("action", "FETCH_ALL");
  formData.append("shop", shop);

  const response = await fetch(
    "https://tales-respected-kitty-indexed.trycloudflare.com/api/reviews",
    {
      method: "POST",
      body: formData,
    },
  );
  const data = await response.json();
  return json(data);
};

export default function Review() {
  const { data } = useLoaderData();
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
