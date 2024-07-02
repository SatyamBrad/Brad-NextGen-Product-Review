import DashboardCard from "../components/dashboardCard";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { admin } = await authenticate.admin(request);

    const response = await admin.graphql(
        `#graphql
            query getProducts {
                products (first: 3) {
                edges {
                    node {
                    id
                    handle
                    }
                    }
                }
            }`
    );

    const data = await response.json();
    return data;
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
                // borderColor: "white",
                // borderWidth: "1px",
                // borderStyle: "solid",
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
                    Reviews (4)
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
                        Women's Gentle-Support High-Waisted 7/8 Leggings
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
                        Aishwarya G.{" "}
                        <span
                            style={{ fontSize: "14px", color: "#fff", marginRight: "5px" }}
                        >
                            &#10004;
                        </span>{" "}
                        May 12 at 10:49 pm
                    </div>
                    <p style={{ fontSize: "14px" }}>
                        This is THE best pant I have worn for gym so far. Have tried other
                        brands for the last 5 years, but this one beats them all. It feels
                        amazing wearing it. I wasn't sure when I bought it and needed a
                        pant, which is why I tried it once and then bought it, but after gym
                        now, it's soo good. I love everything about it and have urged some
                        of my friends to buy it!
                    </p>
                </div>
            </div>
        </div>
    );
};


