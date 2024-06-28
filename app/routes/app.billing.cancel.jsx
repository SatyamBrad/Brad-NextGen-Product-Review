import { redirect } from "@remix-run/node";
import {
  ADVANCED_SHOPIFY_PLAN,
  BASIC_SHOPIFY_PLAN,
  SHOPIFY_PLAN,
  SHOPIFY_PLUS_PLAN,
  authenticate,
} from "../shopify.server";
export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const { appSubscriptions } = await billing.check({
    plans: [
      BASIC_SHOPIFY_PLAN,
      SHOPIFY_PLAN,
      ADVANCED_SHOPIFY_PLAN,
      SHOPIFY_PLUS_PLAN,
    ],
    isTest: true,
  });
  const subscription = appSubscriptions[0];
  const cancelledSubscription = await billing.cancel({
    subscriptionId: subscription.id,
    isTest: true,
    prorate: true,
  });
  console.log(cancelledSubscription)
  return redirect("/app/billing")
};
