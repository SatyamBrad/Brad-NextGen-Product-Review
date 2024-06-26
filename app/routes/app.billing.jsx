import React from 'react'

import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);

  const { hasActivePayment, appSubscriptions } = await billing.check({
    plans: [MONTHLY_PLAN],
    isTest: false,
  });
 console.log(hasActivePayment)
 console.log(appSubscriptions)
};


export default function Billing() {
  return (
    <div>Billing</div>
  )
}
