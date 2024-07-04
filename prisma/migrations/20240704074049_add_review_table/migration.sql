/*
  Warnings:

  - You are about to drop the column `shopId` on the `Review` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT,
    "productId" TEXT,
    "customerId" TEXT,
    "review" TEXT,
    "starRating" TEXT
);
INSERT INTO "new_Review" ("customerId", "id", "productId", "review", "starRating") SELECT "customerId", "id", "productId", "review", "starRating" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
