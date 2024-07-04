/*
  Warnings:

  - You are about to alter the column `starRating` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Made the column `customerId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shop` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "review" TEXT,
    "starRating" INTEGER DEFAULT 0
);
INSERT INTO "new_Review" ("customerId", "id", "productId", "review", "shop", "starRating") SELECT "customerId", "id", "productId", "review", "shop", "starRating" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_shop_productId_customerId_key" ON "Review"("shop", "productId", "customerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
