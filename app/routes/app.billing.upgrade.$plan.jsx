import { redirect } from "@remix-run/node";
import {
  ADVANCED_SHOPIFY_PLAN,
  BASIC_SHOPIFY_PLAN,
  SHOPIFY_PLAN,
  SHOPIFY_PLUS_PLAN,
  authenticate,
} from "../shopify.server";

export const loader = async ({ request, params }) => {
  const plan = {
    BASIC_SHOPIFY_PLAN,
    SHOPIFY_PLAN,
    ADVANCED_SHOPIFY_PLAN,
    SHOPIFY_PLUS_PLAN,
  }[params.plan];

  const { billing, session } = await authenticate.admin(request);

  await billing.require({
    plans: [
      BASIC_SHOPIFY_PLAN,
    ],
    onFailure: async () =>
      billing.request({
        plan: plan,
        isTest: true,
        returnUrl:
          `https://admin.shopify.com/store/${session.shop.split(".")[0]}/apps/${process.env.APP_NAME}/app/billing`,
      }),
  });

  return redirect("/app/billing");
};
