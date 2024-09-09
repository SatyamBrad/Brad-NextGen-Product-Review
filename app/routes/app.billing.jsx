import { useEffect, useState } from "react";
import plans from "../components/billing-pricing.json";
import "../styles/billing.css";
import { authenticate } from "../shopify.server";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(`
    {
      currentAppInstallation {
        activeSubscriptions {
          id
          name
        }
      }
    }
  `);

  const currentPlan = (await response.json())?.data?.currentAppInstallation
    ?.activeSubscriptions;
  return json(currentPlan);
};

export default function Billing() {
  const loaderData = useLoaderData();
  const currentPlan = loaderData[0]?.name;
  const currentPlanId = loaderData[0]?.id;
  const [currentPlanName, currentPlanDuration] = currentPlan?.split("-") || [
    "free",
    undefined,
  ];

  const actionData = useActionData();
  const [planDuration, setPlanDuration] = useState("monthly");

  useEffect(() => {
    if (actionData?.confirmationUrl) {
      top.location.href = actionData.confirmationUrl;
    }
  }, [actionData]);

  const isCurrentPlan = (item) => item.id.includes(currentPlanName);

  return (
    <div className="billing-container">
      <div className="billing-header">
        <h1>Select a Plan</h1>
        <div>
          {["monthly", "annually"].map((duration) => (
            <span key={duration}>
              <input
                type="radio"
                name="billing-radio-plan"
                id={`billing-radio-${duration}`}
                onChange={() => setPlanDuration(duration)}
                checked={planDuration === duration}
              />
              <label
                className="custom-radio-btn"
                onClick={() => setPlanDuration(duration)}
              >
                {planDuration === duration && (
                  <label className="custom-radio-inner-btn"></label>
                )}
              </label>
              <label htmlFor={`billing-radio-${duration}`}>
                {duration.toUpperCase()}
              </label>
            </span>
          ))}
        </div>
      </div>

      <div className="billing-plans">
        {plans[planDuration].map((item, index) => (
          <div key={index} className="billing-plans-item">
            <div>
              <h3 className="billing-plans-item-name">{item.name}</h3>
            </div>

            <div className="billing-plans-item-price">
              <span className="price">
                {item.amount > 0
                  ? `${item.currencySymbol} ${item.amount}`
                  : "Free"}
              </span>
            </div>

            <div className="billing-plans-item-information"></div>

            <div className="billing-plans-item-buttons">
              {isCurrentPlan(item) ? (
                <button disabled>Current Plan</button>
              ) : (
                <Form action="/app/billing" method="POST">
                  <input type="hidden" name="name" value={item.id} />
                  <input type="hidden" name="amount" value={item.amount} />
                  <input
                    type="hidden"
                    name="currencyCode"
                    value={item.currencyCode}
                  />
                  <input
                    type="hidden"
                    name="interval"
                    value={
                      planDuration === "monthly" ? "EVERY_30_DAYS" : "ANNUAL"
                    }
                  />
                  <button type="submit"> Select Plan </button>
                </Form>
              )}

              {currentPlanName !== "free" && isCurrentPlan(item) ? (
                currentPlanDuration === planDuration ? (
                  <Form
                    action="/app/billing"
                    method="DELETE"
                    id="billing-delete-button"
                  >
                    <input type="hidden" name="id" value={currentPlanId} />
                    <button
                      className="cancel-btn"
                      onClick={(event) => {
                        if (
                          !confirm("Are you sure you want to Cancel the Plan?")
                        ) {
                          event.preventDefault();
                        }
                      }}
                    >
                      Cancel Plan
                    </button>
                  </Form>
                ) : (
                  <Form action="/app/billing" method="POST">
                    <input type="hidden" name="name" value={item.id} />
                    <input type="hidden" name="amount" value={item.amount} />
                    <input
                      type="hidden"
                      name="currencyCode"
                      value={item.currencyCode}
                    />
                    <input
                      type="hidden"
                      name="interval"
                      value={
                        planDuration === "monthly" ? "EVERY_30_DAYS" : "ANNUAL"
                      }
                    />
                    {currentPlanDuration === "monthly" ? (
                      <button>Upgrade to Yearly plan</button>
                    ) : (
                      <button>Downgrade to Monthly Plan</button>
                    )}
                  </Form>
                )
              ) : (
                <button style={{ visibility: "hidden" }}>hidden button</button>
              )}
            </div>

            <div className="billling-plans-item-features">
              {item.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { method } = request;

  const handleError = (userErrors) => {
    if (userErrors.length > 0) {
      throw new Error(userErrors.map((error) => error.message).join(", "));
    }
  };

  try {
    if (method === "DELETE") {
      const id = formData.get("id");
      if (!id) return json({ error: "ID field is required" });

      const response = await admin.graphql(
        `#graphql
        mutation AppSubscriptionCancel($id: ID!) {
          appSubscriptionCancel(id: $id) {
            userErrors {
              message
            }
            appSubscription {
              id
              status
            }
          }
        }`,
        { variables: { id } },
      );

      const result = await response.json();
      handleError(result?.data?.appSubscriptionCancel?.userErrors);
      return json(result?.data?.appSubscriptionCancel);
    } else if (method === "POST") {
      const name = formData.get("name");
      const amount = formData.get("amount");
      const currencyCode = formData.get("currencyCode");
      const interval = formData.get("interval");

      if (!name || !amount || !currencyCode || !interval) {
        return json({ error: "All fields are required" });
      }

      const response = await admin.graphql(
        `#graphql
        mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean!) {
          appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {
            userErrors {
              message
            }
            appSubscription {
              id
            }
            confirmationUrl
          }
        }`,
        {
          variables: {
            name,
            returnUrl: `https://admin.shopify.com/store/${session.shop.replace(".myshopify.com", "")}/apps/brad-nextgen-wishlist-1/app/billing`,
            test: true,
            lineItems: [
              {
                plan: {
                  appRecurringPricingDetails: {
                    price: { amount: parseFloat(amount), currencyCode },
                    interval,
                  },
                },
              },
            ],
          },
        },
      );

      const result = await response.json();
      handleError(result?.data?.appSubscriptionCreate?.userErrors);
      return json(result?.data?.appSubscriptionCreate);
    }
  } catch (err) {
    console.error(err);
    return json({ error: err.message });
  }
};
