import DashboardCard from "../components/dashboardCard";

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async ({ request }) => {

    const formData = new FormData();
    formData.append("action", "FETCH_SUMMARY");
    formData.append("shop", "bradnextgenwishlist");
    formData.append("productId", "prod123");
    const response = await fetch(
        "https://grams-necessarily-player-camcorders.trycloudflare.com/api/reviews",
        {
            method: "POST",
            body: formData,
        },
    );
    const data = await response.json();
    console.log(data);
    return json(data);

}

export default function DashboardContent() {
    const { data } = useLoaderData();


    return (
        <div
            style={{
                width: "80%",
                padding: "20px",
                color: "white",
                backgroundColor: "#0B0B22",
                minHeight: "100vh",
                minWidth: "100%",
                borderTopRadius: "8px",

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
                            }}
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
                            }}
                        >
                            All reviews
                        </button>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                }}
            >
                <DashboardCard />
                <DashboardCard ReviewsCollected={data.summary._avg.starRating} CardName="Overall Avg. Rating" />
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
                    starRating
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
                        <span style={{ fontSize: "24px", marginRight: "5px" }}>★★★★★</span>
                        <div
                            style={{
                                backgroundColor: "#505050",
                                color: "#fff",
                                padding: "5px 10px",
                                borderRadius: "4px",
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
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        reviewassss
                    </div>
                    <div
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        Amazing workout pants!
                    </div>
                    <div style={{ fontSize: "14px", marginBottom: "10px" }}>
                        customerName{" "}
                        <span
                            style={{ fontSize: "14px", color: "#fff", marginRight: "5px" }}
                        >
                            &#10004;
                        </span>{" "}
                        createdAt
                    </div>
                    <p style={{ fontSize: "14px" }}>
                        reviewDescription
                    </p>
                </div>
            </div>
        </div>
    );
};


