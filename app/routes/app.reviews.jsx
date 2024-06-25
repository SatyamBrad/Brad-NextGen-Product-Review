import { TitleBar } from "@shopify/app-bridge-react";
import "../styles/review.css";
import ReviewComponent from "../components/ReviewComponent";

const data = [
  {
    heading: "Cool sheets",
    checked: true,
    author: "Brenda H.",
    verified: true,
    time: "May 11 at 09:00 am",
    status: "pending",
    review:
      "They're the first what actually work to keep up comfortable all night",
  },
  {
    heading: "Cool sheets",
    checked: false,
    author: "Brenda H.",
    verified: true,
    time: "May 11 at 09:00 am",
    status: "pending",
    review:
      "They're the first what actually work to keep up comfortable all night",
  },
  {
    heading: "Cool sheets",
    checked: false,
    author: "Brenda H.",
    verified: true,
    time: "May 11 at 09:00 am",
    status: "pending",
    review:
      "They're the first what actually work to keep up comfortable all night",
  },
  {
    heading: "Cool sheets",
    checked: false,
    author: "Brenda H.",
    verified: true,
    time: "May 11 at 09:00 am",
    status: "pending",
    review:
      "They're the first what actually work to keep up comfortable all night",
  },
  {
    heading: "Cool sheets",
    checked: false,
    author: "Brenda H.",
    verified: true,
    time: "May 11 at 09:00 am",
    status: "pending",
    review:
      "They're the first what actually work to keep up comfortable all night",
  },
  {
    heading: "Cool sheets",
    checked: false,
    author: "Brenda H.",
    verified: true,
    time: "May 11 at 09:00 am",
    status: "pending",
    review:
      "They're the first what actually work to keep up comfortable all night",
  },
  {
    heading: "Cool sheets",
    checked: false,
    author: "Brenda H.",
    verified: true,
    time: "May 11 at 09:00 am",
    status: "pending",
    review:
      "They're the first what actually work to keep up comfortable all night",
  },
];

export default function Review() {
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
