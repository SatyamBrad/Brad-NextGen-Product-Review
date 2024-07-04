-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopId" TEXT,
    "productId" TEXT,
    "customerId" TEXT,
    "review" TEXT,
    "starRating" TEXT
);
