import DashboardCard from "../components/dashboardCard";
import { useLoaderData } from "@remix-run/react";
import StarRating from "../components/starComponent";
import { format } from 'date-fns';
import { json } from "@remix-run/node";

export const loader = async () => {

    const formData = new FormData();
    formData.append("action", "FETCH_ALL");
    formData.append("shop", "bradnextgenwishlist.myshopify.com");

    const appUrl = `https://adventures-thousand-pound-object.trycloudflare.com/api/reviews`;

    const response = await fetch(
        appUrl,
        {
            method: "POST",
            body: formData,
        },
    );
    const fetchAllReviews = await response.json();
    return json(fetchAllReviews);

}

export default function DashboardContent() {
    const fetchAllReviews = useLoaderData();
    const data = fetchAllReviews.data[6]

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
                    padding: "32px",
                }}
            >
                <DashboardCard ReviewsCollected="3,515" CardName="Reviews collected" Progress="6.5%" TimePeriod="over previous 30 days" />
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
                        <span style={{ fontSize: "24px", marginRight: "5px" }}><StarRating ratings="4.3" /></span>
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
                            marginBottom: "10px",
                        }}
                    >
                        <bold>{data.reviewTitle}</bold>
                    </div>
                    <div
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        {data.reviewTitle}
                    </div>
                    <div style={{ fontSize: "14px", marginBottom: "10px", }}>
                        {data.customerName}
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
        </div>
    );
};


