import React from "react";
import {
  ADVANCED_SHOPIFY_PLAN,
  BASIC_SHOPIFY_PLAN,
  SHOPIFY_PLAN,
  SHOPIFY_PLUS_PLAN,
  authenticate,
} from "../shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import "../styles/billing.css";
import { TitleBar } from "@shopify/app-bridge-react";
import BillingCardComponent from "../components/BillingCardComponent";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const plans = [
    {
      name: BASIC_SHOPIFY_PLAN,
      title: "BASIC_SHOPIFY_PLAN",
      url: "/app/billing/upgrade/BASIC_SHOPIFY_PLAN",
      amount: 9.99,
      features: [
        "For Shopify Plan Stores",
        "Automatic Review Requests",
        "Display Reviews On-Site",
        "Collect Photos/Videos",
        "Share Reviews to Facebook",
        "Custom questions",
        "Import existing reviews",
        "Support within 24 Hrs",
      ],
    },
    {
      name: SHOPIFY_PLAN,
      title: "SHOPIFY_PLAN",
      url: "/app/billing/upgrade/SHOPIFY_PLAN",
      amount: 19.99,
      features: [
        "For Shopify Plan Stores",
        "Automatic Review Requests",
        "Display Reviews On-Site",
        "Collect Photos/Videos",
        "Share Reviews to Facebook",
        "Custom questions",
        "Import existing reviews",
        "Support within 24 Hrs",
      ],
    },
    {
      name: ADVANCED_SHOPIFY_PLAN,
      title: "ADVANCED_SHOPIFY_PLAN",
      url: "/app/billing/upgrade/ADVANCED_SHOPIFY_PLAN",
      amount: 29.99,
      features: [
        "For Shopify Plan Stores",
        "Automatic Review Requests",
        "Display Reviews On-Site",
        "Collect Photos/Videos",
        "Share Reviews to Facebook",
        "Custom questions",
        "Import existing reviews",
        "Support within 24 Hrs",
      ],
    },
    {
      name: SHOPIFY_PLUS_PLAN,
      title: "SHOPIFY_PLUS_PLAN",
      url: "/app/billing/upgrade/SHOPIFY_PLUS_PLAN",
      amount: 59.99,
      features: [
        "For Shopify Plan Stores",
        "Automatic Review Requests",
        "Display Reviews On-Site",
        "Collect Photos/Videos",
        "Share Reviews to Facebook",
        "Custom questions",
        "Import existing reviews",
        "Support within 24 Hrs",
      ],
    },
  ];

  const { hasActivePayment, appSubscriptions } = await billing.check({
    plans: [
      BASIC_SHOPIFY_PLAN,
      SHOPIFY_PLAN,
      ADVANCED_SHOPIFY_PLAN,
      SHOPIFY_PLUS_PLAN,
    ],
    isTest: true,
  });

  return json({ plans, hasActivePayment, appSubscriptions });
};

export default function Billing() {
  const navigate = useNavigate();
  const { plans, hasActivePayment, appSubscriptions } = useLoaderData();

  const handleClick = (e) => {
    const plan = e.target.name;
    navigate(`/app/billing/upgrade/${plan}`);
  };
  // use this to compare the value with other plans to manually block downgrading to other plans
  // for upgrading use appSubscriptionsUpgrade from the graphql api
  // console.log(appSubscriptions[0].lineItems[0].plan.pricingDetails.price.amount);
  return (
    <div className="billing-container">
      <TitleBar title="Billings" />
      <div className="current-plan">
        {hasActivePayment ? (
          <>
            <div>
              <h2>Current Subscription:</h2>
              <p>{appSubscriptions[0].name}</p>
            </div>
            <button className="cancel-subscription" onClick={() => navigate("cancel")}>
              Cancel Subscription
            </button>
          </>
        ) : (
          <div>
            <h2>Current Subscription:</h2>
            <p>Free Subscription</p>
          </div>
        )}
      </div>
      <div className="available-plans">
        {plans.map((plan, index) => (
          <BillingCardComponent key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
}
