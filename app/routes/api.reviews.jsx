import { json } from "@remix-run/node";
import db from "../db.server.js";
import { cors } from "remix-utils/cors";

export const loader = ({ request }) => {
  return json({ hello: "world" });
};

export const action = async ({ request }) => {
  let formData = await request.formData();
  const images = formData.getAll("images");
  formData = Object.fromEntries(formData);

  const shop = formData.shop;
  const productId = formData.productId;
  const customerId = formData.customerId;
  const customerName = formData.customerName;
  const reviewTitle = formData.reviewTitle;
  const reviewDescription = formData.reviewDescription;
  const starRating = Number(formData.starRating);
  const action = formData.action;

  const imageUrls = [];

  async function uploadImages(images) {
    const uploadPromises = images.map(async (image) => {
      const imageFormData = new FormData();

      imageFormData.append("file", image);
      imageFormData.append("upload_preset", "fqvxnxnt");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/brad-shaunak/image/upload",
          {
            method: "POST",
            body: imageFormData,
            redirect: "follow",
          },
        );

        const data = await res.json();
        imageUrls.push({ imageUrl: data.url });
      } catch (err) {
        console.log(err);
      }
    });

    await Promise.all(uploadPromises);
  }

  try {
    switch (action) {
      case "FETCH_ALL":
        if (!shop) throw new Error("Required Field: shop");

        const fetchAllReviews = await db.review.findMany({
          where: {
            shop,
          },
          include: {
            images: true,
          },
        });

        const fetchAllResponse = json({
          ok: true,
          message: "Successfully fetched all data from shop",
          data: fetchAllReviews,
        });

        return cors(request, fetchAllResponse);

      case "CREATE":
        if (!shop || !productId || !customerId)
          throw new Error("Required fields: shop, productId, customerId");

        if (starRating < 1 || starRating > 5)
          throw new Error("starRating must be between 1 and 5");

        await uploadImages(images); // Await the uploadImages function

        const reviewCreated = await db.review.create({
          data: {
            shop,
            productId,
            customerId,
            ...(customerName && { customerName }),
            ...(reviewTitle && { reviewTitle }),
            ...(reviewDescription && { reviewDescription }),
            ...(starRating && { starRating }),
            images: {
              createMany: {
                data: imageUrls,
              },
            },
          },
          include: {
            images: true,
          },
        });

        const responseCreate = json({
          ok: true,
          message: "Review successfully created",
          created_data: reviewCreated,
        });

        return cors(request, responseCreate);
    }
  } catch (err) {
    console.error(err);
    const response = json({ ok: false, message: err.message });
    return cors(request, response);
  }
};
