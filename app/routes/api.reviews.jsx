import { json } from "@remix-run/node";
import db from "../db.server.js";
import { cors } from "remix-utils/cors";

export const action = async ({ request }) => {
  var imageUrls = [];
  const formData = await request.formData();

  const images = formData.getAll("images");
  const productId = formData.get("productId");
  const customerId = formData.get("customerId");
  const customerName = formData.get("customerName");
  const reviewTitle = formData.get("reviewTitle");
  const reviewDescription = formData.get("reviewDescription");
  const starRating = Number(formData.get("starRating"));
  const action = formData.get("action");
  const shop = formData.get("shop");

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
      case "FETCH_SUMMARY":
        if (!shop) throw new Error("Required Field: shop");
        const fetchSummaryReviews1 = await db.review.aggregate({
          _avg: {
            starRating: true,
          },
          _count: {
            id: true,
          },
        });

        const fetchSummaryReviews2 = await db.review.groupBy({
          by: ["starRating"],
          _count: {
            id: true,
          },
        });

        const fetchSummaryResponse = json({
          ok: true,
          message: "Successfully fetched the summary from shop",
          data: { ...fetchSummaryReviews1, ...fetchSummaryReviews2 },
        });
        return cors(request, fetchSummaryResponse);

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

        const checkRecordBeforeCreating = await db.review.findUnique({
          where: {
            shop_productId_customerId: {
              shop,
              productId,
              customerId
            }
          }
        })

        if(checkRecordBeforeCreating) {
          throw new Error("Record Exist cannot Create another Record")
        }

        await uploadImages(images);
        const createdReview = await db.review.create({
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

        const createdResponse = json({
          ok: true,
          message: "Review record successfully created",
          created_data: createdReview,
        });

        return cors(request, createdResponse);
    }
  } catch (err) {
    console.error(err);
    const response = json({ ok: false, message: err.message });
    return cors(request, response);
  }
};
