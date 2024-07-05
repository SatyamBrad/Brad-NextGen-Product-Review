import { json } from "@remix-run/node";
import db from "../db.server.js";
import { cors } from "remix-utils/cors";

export const action = async ({ request }) => {
  let formData = await request.formData();
  formData = Object.fromEntries(formData);

  const shop = formData.shop;
  const customerId = formData.customerId;
  const productId = formData.productId;
  const review = formData.review;
  const starRating = Number(formData.starRating);
  const action = formData.action;

  try {
    switch (action) {
      case "FETCH_ALL":
        const reviewListFetchAll = await db.review.findMany();

        const responseFetchAll = json({
          ok: true,
          message: "Successfully retrieved all the records in the database.",
          data: reviewListFetchAll,
          length: reviewListFetchAll.length,
        });

        return cors(request, responseFetchAll);

      case "FETCH_BY_SHOP":
        if (!shop) throw new Error("Required fields: shop");

        const reviewsFetchByShop = await db.review.findMany({
          where: {
            shop,
          },
        });

        if (reviewsFetchByShop.length === 0)
          throw new Error("Could not find such shop");

        const responseFetchByShop = json({
          ok: true,
          message: "Successfully retrieved all records by shop name.",
          data: reviewsFetchByShop,
          length: reviewsFetchByShop.length,
        });

        return cors(request, responseFetchByShop);

      case "FETCH_BY_PRODUCT":
        if (!shop || !productId)
          throw new Error("Required fields: shop, productId");

        const reviewsFetchByProduct = await db.review.findMany({
          where: {
            shop,
            productId,
          },
        });

        if (reviewsFetchByProduct === 0)
          throw new Error("Could not find such shop or productId");

        const responseFetchByProduct = json({
          ok: true,
          message: "Successfully retrieved all records by product id",
          data: reviewsFetchByProduct,
          length: reviewsFetchByProduct.length,
        });

        return cors(request, responseFetchByProduct);

      case "FETCH_BY_CUSTOMER":
        if (!shop || !customerId)
          throw new Error("Required fields: shop, customerId");

        const reviewsFetchByCustomer = await db.review.findMany({
          where: {
            shop,
            customerId,
          },
        });

        if (reviewsFetchByCustomer.length === 0)
          throw new Error("Could not find such shop or customerId");

        const responseFetchByCustomer = json({
          ok: true,
          message: "Successfully retrieved all records by customer id",
          data: reviewsFetchByCustomer,
          length: reviewsFetchByCustomer.length,
        });

        return cors(request, responseFetchByCustomer);

      case "FETCH_ONE":
        if (!shop || !productId || !customerId)
          throw new Error("Required fields: shop, productId, customerId");

        const reviewFetch = await db.review.findUnique({
          where: {
            shop_productId_customerId: {
              shop,
              productId,
              customerId,
            },
          },
        });

        if (!reviewFetch)
          throw new Error(
            "Could not find such shop or productId or customerId",
          );

        const responseFetch = json({
          ok: true,
          message: "Successfully retrieved a particular record.",
          data: reviewFetch,
          length: reviewFetch.length,
        });

        return cors(request, responseFetch);

      case "CREATE":
        if (!shop || !productId || !customerId)
          throw new Error("Required fields: shop, productId, customerId");

        if (starRating < 1 || starRating > 5)
          throw new Error("starRating must be between 1 and 5");

        const reviewCheckIfExist = await db.review.findUnique({
          where: {
            shop_productId_customerId: {
              shop,
              productId,
              customerId,
            },
          },
        });

        if (reviewCheckIfExist)
          throw new Error("Record already exist, cannot create");

        const reviewCreated = await db.review.create({
          data: {
            shop,
            productId,
            customerId,
            ...(review && { review }),
            ...(starRating && { starRating }),
          },
        });

        const responseCreate = json({
          ok: true,
          message: "Review successfully created",
          created_data: reviewCreated,
        });

        return cors(request, responseCreate);

      case "UPDATE":
        if (!shop || !productId || !customerId)
          throw new Error("Required fields: shop, productId, customerId");

        if (starRating < 1 || starRating > 5)
          throw new Error("starRating must be between 1 and 5");

        const reviewCheckIfNotExist = await db.review.findUnique({
          where: {
            shop_productId_customerId: {
              shop,
              productId,
              customerId,
            },
          },
        });

        if (!reviewCheckIfNotExist)
          throw new Error("Record does not exist, cannot update");

        const updated = await db.review.update({
          where: {
            shop_productId_customerId: {
              shop,
              productId,
              customerId,
            },
          },
          data: {
            ...(review && { review }),
            ...(starRating && { starRating }),
          },
        });

        const responseUpdate = json({
          ok: true,
          message: "Review successfully edited",
          updated_data: updated,
        });

        return cors(request, responseUpdate);

      case "DELETE":
        if (!shop || !productId || !customerId)
          throw new Error("Required fields: shop, productId, customerId");

        const reviewCheckToDelete = await db.review.findUnique({
          where: {
            shop_productId_customerId: {
              shop,
              productId,
              customerId,
            },
          },
        });

        if (!reviewCheckToDelete)
          throw new Error("Record does not exist, cannot delete");

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
          deleted_data: deleted,
        });
        return cors(request, responseDelete);

      default:
        return json({ message: "No such action available" });
    }
  } catch (error) {
    return json({
      ok: false,
      message: error.message,
    });
  }
};
// just to make it 250 lines
