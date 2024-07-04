import { json } from "@remix-run/node";
import db from "../db.server.js";
import { cors } from "remix-utils/cors";

export const action = async ({ request }) => {
  let formData = await request.formData();
  formData = Object.fromEntries(formData);

  const shop = formData.shop || "";
  const customerId = formData.customerId || "";
  const productId = formData.productId || "";
  const review = formData.review || "";
  const starRating = Number(formData.starRating) || 0;
  const action = formData.action;

  if ((starRating < 1 || starRating > 5) && starRating !== 0) {
    return json({ message: "starRating must be between 1 and 5" });
  }

  switch (action) {
    case "FETCH_ALL":
      const reviewListFetchAll = await db.review.findMany();

      const responseFetchAll = json({
        ok: true,
        message: "Successful fetch",
        data: reviewListFetchAll,
      });

      return cors(request, responseFetchAll);

    case "FETCH_BY_SHOP":
      const reviewListFetchByShop = await db.review.findMany({
        where: {
          shop,
        },
      });

      const responseFetchByShop = json({
        ok: true,
        message: "Successful fetch",
        data: reviewListFetchByShop,
      });

      return cors(request, responseFetchByShop);

    case "FETCH_BY_PRODUCT":
      const reviewListFetchByProduct = await db.review.findMany({
        where: {
          shop,
          productId,
        },
      });

      const responseFetchByProduct = json({
        ok: true,
        message: "Successful fetch",
        data: reviewListFetchByProduct,
      });

      return cors(request, responseFetchByProduct);

    case "FETCH_ONE":
      const reviewFetch = await db.review.findMany({
        where: {
          shop,
          productId,
          customerId,
        },
      });

      const responseFetch = json({
        ok: true,
        message: "Successful fetch",
        data: reviewFetch,
      });

      return cors(request, responseFetch);

    case "FETCH_BY_CUSTOMER":
      const reviewListFetchByCustomer = await db.review.findMany({
        where: {
          shop,
          customerId,
        },
      });

      const responseFetchByCustomer = json({
        ok: true,
        message: "Successful fetch",
        data: reviewListFetchByCustomer,
      });

      return cors(request, responseFetchByCustomer);

    case "UPDATE":
      const updated = await db.review.update({
        where: {
          shop_productId_customerId: {
            shop,
            productId,
            customerId,
          },
        },
        data: {
          review,
          starRating,
        },
      });
      const responseUpdate = json({
        ok: true,
        message: "Review successfully edited",
        data: updated,
      });
      return cors(request, responseUpdate);

    case "CREATE":
      const reviewCreated = await db.review.create({
        data: {
          shop,
          productId,
          customerId,
          review,
          starRating,
        },
      });
      const responseCreate = json({
        message: "Review added to database",
        method: action,
        reviewCreated,
      });
      return cors(request, responseCreate);

    case "DELETE":
      const deleted = await db.review.delete({
        where: {
          shop_productId_customerId: {
            shop,
            productId,
            customerId,
          },
        },
      });

      const responseDelete = json({
        ok: true,
        message: "Review successfully deleted",
        data: deleted,
      });
      return cors(request, responseDelete);

    default:
      return json({ message: "No such action available" });
  }
};
