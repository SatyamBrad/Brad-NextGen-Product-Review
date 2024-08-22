import React, { useState, useRef } from 'react';
import DashboardCard from "../components/dashboardCard";
import ReviewComponent from "../components/ReviewComponent"
import { useLoaderData } from "@remix-run/react";
import StarRating from "../components/starComponent";
import { format } from 'date-fns';
import { json } from "@remix-run/node";
import db from "../db.server.js";


export const loader = async ({ request }) => {

  const shop = "bradnextgenwishlist.myshopify.com";

  const fetchAllReviews = await db.review.findMany({
    where: {
      shop,
    },
    include: {
      images: true,
    },
  });

  const fetchAllResponse = json({
    ok: true,
    message: "Successfully fetched all data from shop",
    data: fetchAllReviews,
  });


  const active = true || false;
  return fetchAllResponse;
}

export default function DashboardContent() {
  const fetchAllResponse = useLoaderData();
  const [activeTab, setActiveTab] = useState('overview');
  const reviewsRef = useRef(null);
  // console.log(fetchAllResponse);
  const data = fetchAllResponse.data[6];
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'reviews' && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div style={{
      backgroundColor: "#0B0B22",
      width: "80%",
      padding: "20px",
      color: "white",
      minHeight: "100vh",
      minWidth: "100%",
      borderTopRadius: "8px",
      fontFamily: "Montserrat"
    }}>

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
          >

          </div>

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
                textDecoration: activeTab === 'overview' ? "underline 2px" : " ",
                cursor: 'pointer',
              }}
              onClick={() => handleTabClick('overview')}

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
                textDecoration: activeTab === 'reviews' ? "underline 2px" : " ", cursor: 'pointer',
              }}
              onClick={() => handleTabClick('reviews')}
            >
              All Reviews
            </button>
          </div>
        </div>
      </div>
      {activeTab === 'overview' ? (<div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
            padding: "32px",
          }}
        >
          <DashboardCard ReviewsCollected={fetchAllResponse.data.length} CardName="Reviews collected" Progress="6.5%" TimePeriod="over previous 30 days" />
          <DashboardCard />
          <DashboardCard />

        </div>
        <div
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
              <span style={{ fontSize: "24px", marginRight: "5px" }}><StarRating ratings={data.starRating} /></span>
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
              {data.reviewTitle}
            </div>
            <div style={{ fontSize: "14px", marginBottom: "10px" }}>
              <span style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>{data.customerName}</span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  marginRight: "5px"
                }}
              >
                {(data.customerId == "Guest") ? " " : "&#10004"}
              </span>
              {format(new Date(data.createdAt), 'MMMM do, h:mm a')}

            </div>
            <p style={{ fontSize: "14px" }}>
              {data.reviewDescription}
            </p>
          </div>
        </div>
      </div>) :

        (<div className="review-container" ref={reviewsRef} >
          <div className="review-list">
            {fetchAllResponse.data.map((item, index) => (
              <ReviewComponent key={index} item={item} />

            ))}
          </div>
        </div>)}
    </div>
  );
};


