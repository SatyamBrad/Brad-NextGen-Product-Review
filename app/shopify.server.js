import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-04";
import prisma from "./db.server";

export const BASIC_SHOPIFY_PLAN = "Basic Shopify"
export const SHOPIFY_PLAN = "Shopify"
export const ADVANCED_SHOPIFY_PLAN = "Advanced Shopify"
export const SHOPIFY_PLUS_PLAN = "Shopify Plus"

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.April24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  billing:{
    [BASIC_SHOPIFY_PLAN]: {
      amount: 9.99,
      currencyCode:"USD",
      interval: BillingInterval.Every30Days,
    }, 
    [SHOPIFY_PLAN]: {
      amount: 19.99,
      currencyCode:"USD",
      interval: BillingInterval.Every30Days,
    }, 
    [ADVANCED_SHOPIFY_PLAN]: {
      amount: 29.99,
      currencyCode:"USD",
      interval: BillingInterval.Every30Days,
    }, 
    [SHOPIFY_PLUS_PLAN]: {
      amount: 59.99,
      currencyCode:"USD",
      interval: BillingInterval.Every30Days,
    }, 
  },
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.April24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
