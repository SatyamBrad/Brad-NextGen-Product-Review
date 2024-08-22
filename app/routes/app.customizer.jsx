import React from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import "../styles/customizer.css";


export const loader = async () => {
    return json({});
};

export default function ThemeSetup() {
    const data = useLoaderData();
    return (
        <div className="container">

            <main className="main">
                <section className="section">
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <div style={{ marginRight: "24px", paddingRight: "64px" }}>
                            <h2 style={{ paddingBottom: "20px" }}>Get Started</h2>
                            <p>You can turn on the app in your store's theme by following our easy guide on the Theme setup page. Or, if you prefer, we can set up the Wishlist for you. This way, we can add a fancier link in the header and make sure everything matches your store's look.</p>
                            <div className="button-group" style={{ paddingTop: "8px" }}>
                                <button>Theme setup guidelines</button>
                                <button>Request setup</button>
                            </div>
                        </div>
                        <div className="image-container">
                            <img style={{ width: "300px" }} src="/Customizer_Image_1.svg" alt="Setup Illustration" />
                        </div>
                    </div>
                </section>

                <section className="section guidelines" style={{ display: "flex" }}>
                    <div>
                        <h2>Step by step guidelines</h2>
                        <ul>
                            <li>Click on online stores &gt;</li>
                            <li>Click on Customize button &gt;</li>
                            <li>Refer the screen guideline &gt;</li>
                        </ul>
                    </div>
                    <div className="image-container" style={{ padding: "0px" }}>
                        <img style={{ height: "370px", width: "600px", marginLeft: "60%" }} src="/Customizer_Image_2.svg" alt="Step by step guidelines" />
                    </div>
                </section>
            </main>
        </div>
    );
}
