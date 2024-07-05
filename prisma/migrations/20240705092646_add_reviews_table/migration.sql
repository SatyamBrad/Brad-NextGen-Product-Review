-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "review" TEXT DEFAULT '',
    "starRating" INTEGER DEFAULT 0
);
INSERT INTO "new_Review" ("customerId", "id", "productId", "review", "shop", "starRating") SELECT "customerId", "id", "productId", "review", "shop", "starRating" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_shop_productId_customerId_key" ON "Review"("shop", "productId", "customerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
