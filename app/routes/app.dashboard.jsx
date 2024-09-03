import React, { useState } from "react";
import DashboardCard from "../components/dashboardCard.jsx";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import db from "../db.server.js";
import ReviewChart from "../components/Dashboard-chart.jsx";
import { authenticate } from "../shopify.server.js";
import Reviews from "../components/Reviews.jsx";
import "../styles/dashboard.css";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  const reviews = await db.review.findMany({
    where: {
      shop: session.shop,
    },
    include: {
      images: true,
      details: true,
    },
  });

  const fetchAllReviews = await Promise.all(
    reviews.map(async (review) => {
      const productImage = await admin.rest.resources.Image.all({
        session: session,
        product_id: review.productId,
      });
      return { ...review, productImage: productImage.data[0].src };
    }),
  );

  return json({ fetchAllReviews });
};

export default function DashboardContent() {
  const loaderData = useLoaderData();
  const { fetchAllReviews } = loaderData;

  const tabs = [{ title: "overview" }, { title: "all reviews" }];
  const [activeTab, setActiveTab] = useState("overview");

  const averageReviews = (input) => {
    let ratingSum = 0;

    for (var i = 0; i < input.length; i++) {
      ratingSum += input[i].starRating;
    }
    let avg = ratingSum / input.length;
    avg = parseFloat(avg.toFixed(1));

    return avg;
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-navbar">
        {tabs.map((tab, index) => (
          <li
            className={activeTab === tab.title ? "selected-tab" : ""}
            key={index}
            onClick={() => setActiveTab(tab.title)}
          >
            <span>{tab.title}</span>
          </li>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <DashboardCard
                ReviewsCollected={fetchAllReviews.length}
                CardName="Reviews collected"
                Progress="6.5%"
                TimePeriod="over previous 30 days"
              />
              <DashboardCard
                ReviewsCollected={averageReviews(fetchAllReviews)}
                CardName="Overall Avg. Rating"
                Progress="6.5%"
                TimePeriod="over previous 30 days"
              />
              <DashboardCard />
            </div>
            <div
              className="review-card"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <ReviewChart />
              <ReviewChart />
            </div>
          </div>
        )}

        {activeTab === "all reviews" && (
          <Reviews fetchAllReviews={fetchAllReviews} />
        )}
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();

  try {
    switch (formData.get("action")) {
      case "publish":
        const publish = await db.review.updateMany({
          where: {
            id: {
              in: formData.getAll("id"),
            },
          },
          data: {
            status: "Published",
          },
        });
        return json({ publish });
      case "unpublish":
        const unpublish = await db.review.updateMany({
          where: {
            id: {
              in: formData.getAll("id"),
            },
          },
          data: {
            status: "Unpublished",
          },
        });
        return json({ unpublish });
      case "delete":
        const deleteReview = await db.review.deleteMany({
          where: {
            id: {
              in: formData.getAll("id"),
            },
          },
        });
        return json({ deleteReview });
      default:
        throw new Error("No such Method");
    }
  } catch (err) {
    console.error(err);
  }
  // try {
  //   const reviewStatusToChange = await db.review.update({
  //     where: {
  //       shop: session.shop,
  //       id: Number(formData.get("id")),
  //     },
  //     data: {
  //       status: formData.get("newStatus"),
  //     },
  //   });
  //   console.log(reviewStatusToChange);
  // } catch (err) {
  //   console.error(err);
  // }

  return null;
};
