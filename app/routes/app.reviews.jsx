import React, { useState, useRef } from "react";
import DashboardCard from "../components/dashboardCard";
import ReviewComponent from "../components/ReviewComponent";
import { useLoaderData } from "@remix-run/react";
import StarRating from "../components/starComponent";
import { format } from "date-fns";
import { json } from "@remix-run/node";
import db from "../db.server.js";
import ReviewChart from "../components/Dashboard-chart.jsx";
import { authenticate } from "../shopify.server.js";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const fetchAllReviews = await db.review.findMany({
    where: {
      shop: session.shop,
    },
    include: {
      images: true,
    },
  });
  return json({ fetchAllReviews });
};

export default function DashboardContent() {
  const loaderData = useLoaderData();
  const { fetchAllReviews } = loaderData;

  const [activeTab, setActiveTab] = useState("overview");

  // console.log(fetchAllReviews);
  // const reviewData = fetchAllReviews.data[6];
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
    <div
      style={{
        backgroundColor: "#0B0B22",
        width: "80%",
        padding: "20px",
        color: "white",
        minHeight: "100vh",
        minWidth: "100%",
        borderTopRadius: "8px",
        fontFamily: "Montserrat",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          ></div>

          <div
            style={{ display: "flex", alignItems: "center", paddingTop: "8px" }}
          >
            <button
              style={{
                backgroundColor: "#0B0B22",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                marginRight: "10px",
                textDecoration:
                  activeTab === "overview" ? "underline 2px" : " ",
                cursor: "pointer",
              }}
              onClick={() => handleTabClick("overview")}
            >
              Overview
            </button>
            <button
              style={{
                backgroundColor: "#0B0B22",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                textDecoration: activeTab === "reviews" ? "underline 2px" : " ",
                cursor: "pointer",
              }}
              onClick={() => handleTabClick("reviews")}
            >
              All Reviews
            </button>
          </div>
        </div>
      </div>
      {activeTab === "overview" ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
              padding: "32px",
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
          {/* <div
          style={{
            backgroundColor: "#0B0B22",
            color: "#fff",
            padding: "20px",
            borderRadius: "8px",
            borderTopRadius: "8px",
            borderColor: "white",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <div
            style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
          >
            Pending Activity
          </div>
          <div style={{ fontSize: "16px", marginBottom: "20px" }}>

          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <span style={{ fontSize: "24px", marginRight: "5px" }}><StarRating ratings={reviewData.starRating} /></span>
              <div
                style={{
                  backgroundColor: "#505050",
                  color: "#fff",
                  padding: "5px 10px",
                  paddingRight: "16px",
                  paddingLeft: "16px",
                  borderRadius: "10%",
                  marginLeft: "16px",

                }}
              >
                Pending
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            ></div>
          </div>
          <div
            style={{
              backgroundColor: "#0B0B22",
              padding: "20px",
              borderRadius: "8px",
              borderColor: "white",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {reviewData.reviewTitle}
            </div>
            <div style={{ fontSize: "14px", marginBottom: "10px" }}>
              <span style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>{reviewData.customerName}</span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  marginRight: "5px"
                }}
              >
                {(reviewData.customerId == "Guest") ? " " : "&#10004"}
              </span>
              {format(new Date(reviewData.createdAt), 'MMMM do, h:mm a')}

            </div>
            <p style={{ fontSize: "14px" }}>
              {reviewData.reviewDescription}
            </p>
          </div>
        </div> */}
          <div className="review-card">
            <ReviewChart />
          </div>
        </div>
      ) : (
        <div className="review-container">
          <div className="review-list">
            {fetchAllReviews.map((item, index) => (
              <ReviewComponent key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();

  try {
    const reviewStatusToChange = await db.review.update({
      where: {
        shop: session.shop,
        id: Number(formData.get("id")),
      },
      data: {
        status: formData.get("newStatus"),
      },
    });
    console.log(reviewStatusToChange);
  } catch (err) {
    console.error(err);
  }

  return null;
};
