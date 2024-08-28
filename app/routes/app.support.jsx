import React from 'react'
import "../styles/support.css"
export default function support() {
    return (
        <div className="container">
            <main className="main">
                <h1>Support</h1>
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
                            <img style={{ width: "300px" }} src="/amico.svg" alt="Setup Illustration" />
                        </div>
                    </div>
                </section>

                <div class="contact-icons">
                    <div class="icon">
                        <img src="/whatsapp.svg" alt="WhatsApp" />
                    </div>
                    <div class="icon">
                        <img src="/email.svg" alt="Email" />
                    </div>
                    <div class="icon">
                        <img src="/tutorial.svg" alt="Setup" />
                    </div>
                </div>
            </main>
        </div>
    );
}


