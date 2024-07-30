import { json } from "@remix-run/node";
import db from "../db.server.js";
import { cors } from "remix-utils/cors";

export const action = async ({ request }) => {
  var imageUrls = [];
  const formData = await request.formData();

  const shop = formData.get("shop");
  const productId = formData.get("productId");
  const customerId = formData.get("customerId");
  const customerName = formData.get("customerName");
  const reviewTitle = formData.get("reviewTitle");
  const reviewDescription = formData.get("reviewDescription");
  const starRating = Number(formData.get("starRating"));
  const images = formData.getAll("images");
  const action = formData.get("action");
  const pageNo = formData.get("pageNo");
  const quality = formData.get("quality");
  const sizing = formData.get("sizing");
  const starRatingOption = formData.getAll("starRatingOption");
  const orderByOption = formData.get("orderByOption");


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
      case "FETCH_COUNT":
        if (!shop) throw new Error("Required Field: shop");
        if (!productId) throw new Error("Required Field: productId");

        const fetchCount = await db.review.count({
          where: {
            shop,
            productId,
            ...(starRatingOption.length > 0 && {
              starRating: {
                in: starRatingOption.map((item) => Number(item)),
              },
            }),
          },
        });   

        const fetchCountResponse = json({
          ok: true,
          message: "Successfully fetched all count",
          data: fetchCount,
        });

        return cors(request, fetchCountResponse);

      case "FETCH_SUMMARY":
        if (!shop) throw new Error("Required Field: shop");
        if (!productId) throw new Error("Required Field: productId");
        const fetchSummaryReviews1 = await db.review.aggregate({
          _avg: {
            starRating: true,
          },
          _count: {
            id: true,
          },
          where: {
            shop,
            productId,
          },
        });

        const fetchSummaryReviews2 = await db.review.groupBy({
          by: ["starRating"],
          _count: {
            id: true,
          },
          where: {
            shop,
            productId,
          },
        });

        const fetchSummaryReviews3 = await db.reviewDetail.aggregate({
          _avg: {
            value: true,
          },
          where: {
            key: "quality",
            review: {
              shop,
              productId,
            },
          },
        });

        const fetchSummaryReviews4 = await db.reviewDetail.aggregate({
          _avg: {
            value: true,
          },
          where: {
            key: "sizing",
            review: {
              shop,
              productId,
            },
          },
        });

        const fetchSummaryResponse = json({
          ok: true,
          message: "Successfully fetched the summary from shop",
          data: {
            ...{ summary: fetchSummaryReviews1 },
            ...{ ratings: fetchSummaryReviews2 },
            ...{
              sliders: {
                quality: fetchSummaryReviews3?._avg?.value / 4 - 0.25,
                sizing: fetchSummaryReviews4?._avg?.value / 4 + 0.5,
              },
            },
          },
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

      case "FETCH_BY_PRODUCT":
        if (!shop) throw new Error("Required field: shop");
        if (!productId) throw new Error("Required field: productId");
        const fetchByProductReviews = await db.review.findMany({
          where: {
            shop,
            productId,
            ...(starRatingOption.length > 0 && {
              starRating: {
                in: starRatingOption.map((item) => Number(item)),
              },
            }),
          },
          include: {
            images: true,
          },
          skip: (pageNo - 1) * 5,
          take: 5,
          orderBy: {
            createdAt: orderByOption,
          },
        });

        const fetchByProductResponse = json({
          ok: false,
          message: "Retrieved all records from shop by product id",
          data: fetchByProductReviews,
        });

        return cors(request, fetchByProductResponse);

      case "CREATE":
        if (!shop) throw new Error("Required fields: shop");
        if (!productId) throw new Error("Required fields: productId");

        await uploadImages(images);
        const createdReview = await db.review.create({
          data: {
            shop,
            productId,
            ...(customerId && { customerId }),
            ...(customerName && { customerName }),
            ...(reviewTitle && { reviewTitle }),
            ...(reviewDescription && { reviewDescription }),
            ...(starRating && { starRating }),
            images: {
              createMany: {
                data: imageUrls,
              },
            },
            details: {
              createMany: {
                data: [
                  {
                    key: "quality",
                    value: quality && Number(quality),
                  },
                  {
                    key: "sizing",
                    value: sizing && Number(sizing),
                  },
                ],
              },
            },
          },
          include: {
            images: true,
            details: true,
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
