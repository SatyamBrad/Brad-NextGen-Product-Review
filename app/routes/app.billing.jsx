import { authenticate } from "../shopify.server";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect } from "react";
import "../styles/billing.css";
import { TitleBar } from "@shopify/app-bridge-react";

const PLANS = {
  partner_test: {
    monthly: {},
    yearly: {},
  },
  basic: {
    monthly: {
      name: "Basic Shopify Monthly Subscription",
      amount: 9.99,
      currency: "USD",
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
    yearly: {
      name: "Basic Shopify Yearly Subscription",
      amount: 95.9,
      currency: "USD",
      originalPrice: 119.88,
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
  },
  shopify: {
    monthly: {
      name: "Shopify Monthly Subscription",
      amount: 19.99,
      currency: "USD",
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
    yearly: {
      name: "Shopify Yearly Subscription",
      amount: 179.9,
      currency: "USD",
      originalPrice: 239.88,
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
  },
  advanced: {
    monthly: {
      name: "Advanced Shopify Monthly Subscription",
      amount: 29.99,
      currency: "USD",
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
    yearly: {
      name: "Advanced Shopify Yearly Subscription",
      amount: 251.9,
      currency: "USD",
      originalPrice: 359.88,
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
  },
  enterprise: {
    monthly: {
      name: "Shopify Plus Monthly Subscription",
      amount: 59.99,
      currency: "USD",
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
    yearly: {
      name: "Shopify Plus Yearly Subscription",
      amount: 479.9,
      currency: "USD",
      originalPrice: 719.88,
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
  },
};

// const fetchShopPlan = async (admin, session) => {
//   const data = await admin.rest.resources.Shop.all({
//     session: session,
//     fields: "plan_name",
//   });
//   return data.data[0].plan_name;
// };

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  // Uncomment below line in production
  // const shopPlan = await fetchShopPlan(admin, session);

  // For testing
  // const shopPlan = "partner_test"
  // const shopPlan = "basic";
  // const shopPlan = "shopify";
  // const shopPlan = "advanced";
  const shopPlan = "enterprise";

  const isShopFree = shopPlan === "partner_test";

  const response = await admin.graphql(`
    {
      currentAppInstallation {
        activeSubscriptions {
          # createdAt
          # currentPeriodEnd
          id
          # lineItems {
            # id
            # plan {
              # pricingDetails {
                # ... on AppRecurringPricing {
                  # price {
                    # amount
                  # }
                # }
              # }
            # }
          # }
          # status
          name
          test
        }
      }
    }
  `);

  const currentPlan = await response.json();

  return json({
    shop: {
      isShopFree,
      plans: {
        ...PLANS[shopPlan],
      },
    },
    app: currentPlan?.data?.currentAppInstallation?.activeSubscriptions[0],
  });
};

export default function Billing() {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  const { shop, app } = loaderData;
  const { monthly, yearly } = shop.plans;

  const isMonthly = shop?.plans?.monthly?.name === app?.name;
  const isYearly = shop?.plans?.yearly?.name === app?.name;

  useEffect(() => {
    if (actionData?.confirmationUrl) {
      top.location.href = actionData.confirmationUrl;
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    if (!window.confirm("Are you sure you want to cancel the plan?")) {
      event.preventDefault();
    }
  };

  return (
    <div className="billing-container">
      <TitleBar title="Billings" />

      <div className="billing-plan-container">
        <div className="billing-plan-current">
          <div>
            <h2>Current Subscription:</h2>
            <p>
              {shop.isShopFree
                ? "No Subscription"
                : app?.name
                  ? app?.name
                  : "Free Subscription"}
            </p>
          </div>
          <Form action="/app/billing" method="DELETE" onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={app?.id || ""} />
            <button type="submit">Cancel Plan</button>
          </Form>
        </div>

        {!shop.isShopFree && (
          <div className="billing-plans">
            <div
              className={`billing-plan-item ${isMonthly ? "billing-item-disabled" : ""}`}
            >
              <div>
                <h2>{monthly.name}</h2>
              </div>
              <div>
                <p>$ {monthly.amount}/month</p>
              </div>
              <div>
                {monthly.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </div>
              <Form method="POST">
                <input
                  type="hidden"
                  name="name"
                  value={shop?.plans?.monthly.name || ""}
                />
                <input
                  type="hidden"
                  name="amount"
                  value={shop?.plans?.monthly.amount || ""}
                />
                <input
                  type="hidden"
                  name="currencyCode"
                  value={shop?.plans?.monthly.currency || ""}
                />
                <input type="hidden" name="interval" value="EVERY_30_DAYS" />
                <button type="submit">
                  {isMonthly
                    ? "Active Plan"
                    : isYearly
                      ? "Downgrade to Monthly Plan"
                      : "Upgrade to Monthly plan"}
                </button>
              </Form>
            </div>
            <div
              className={`billing-plan-item ${isYearly ? "billing-item-disabled" : ""}`}
            >
              <div>
                <h2>{yearly.name}</h2>
              </div>
              <div>
                <span style={{ display: "flex", gap: "0.5rem" }}>
                  <p>$ {yearly.amount}/year</p>
                  <p style={{ textDecorationLine: "line-through" }}>
                    $ {yearly.originalPrice}/year
                  </p>
                </span>
              </div>
              <div>
                {yearly.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </div>
              <Form method="POST">
                <input
                  type="hidden"
                  name="name"
                  value={shop?.plans?.yearly.name || ""}
                />
                <input
                  type="hidden"
                  name="amount"
                  value={shop?.plans?.yearly.amount || ""}
                />
                <input
                  type="hidden"
                  name="currencyCode"
                  value={shop?.plans?.yearly.currency || ""}
                />
                <input type="hidden" name="interval" value="ANNUAL" />
                <button type="submit">
                  {isYearly ? "Active Plan" : "Upgrade to Annual Plan"}
                </button>
              </Form>
            </div>
          </div>
        )}
      </div>

      <div className="billing-account-container">
        <h2>Account details</h2>
        <p>John Doe</p>
        <p>Johndoe@gmail.com</p>
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const method = request.method;
  const formData = await request.formData();

  try {
    switch (method) {
      case "POST": {
        const name = formData.get("name");
        const amount = formData.get("amount");
        const currencyCode = formData.get("currencyCode");
        const interval = formData.get("interval");

        if (!name || !amount || !currencyCode || !interval) {
          return json({ error: "All fields are required" }, { status: 400 });
        }

        const response = await admin.graphql(
          `#graphql
          mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean!) {
            appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {
              userErrors {
                field
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
              returnUrl:
                "https://admin.shopify.com/store/bradnextgenwishlist/apps/brad-nextgen-wishlist-1/app/billing",
              test: true,
              lineItems: [
                {
                  plan: {
                    appRecurringPricingDetails: {
                      price: {
                        amount: parseFloat(amount), // Ensure amount is a number
                        currencyCode,
                      },
                      interval,
                    },
                  },
                },
              ],
            },
          },
        );

        if (!response.ok) {
          throw new Error("GraphQL request failed");
        }

        const data = await response.json();
        const result = data?.data?.appSubscriptionCreate;

        if (result?.userErrors?.length > 0) {
          return json({ errors: result.userErrors }, { status: 400 });
        }

        return json(result);
      }

      case "DELETE": {
        const id = formData.get("id");

        if (!id) return json({ error: "ID is missing" }, { status: 400 });

        const response = await admin.graphql(
          `#graphql
          mutation AppSubscriptionCancel($id: ID!) {
            appSubscriptionCancel(id: $id) {
              userErrors {
                field
                message
              }
              appSubscription {
                id
                status
              }
            }
          }`,
          {
            variables: { id },
          },
        );

        if (!response.ok) {
          throw new Error("GraphQL request failed");
        }

        const data = await response.json();
        const result = data?.data?.appSubscriptionCancel;

        if (result?.userErrors?.length > 0) {
          return json({ errors: result.userErrors }, { status: 400 });
        }

        return json(result);
      }

      default:
        return json({ error: "No such method" }, { status: 405 });
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    return json({ error: error.message });
  }
};
