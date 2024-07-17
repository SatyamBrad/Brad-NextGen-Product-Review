-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "customerId" TEXT DEFAULT 'Guest',
    "customerName" TEXT DEFAULT '',
    "reviewTitle" TEXT DEFAULT '',
    "reviewDescription" TEXT DEFAULT '',
    "starRating" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Review" ("createdAt", "customerId", "customerName", "id", "productId", "reviewDescription", "reviewTitle", "shop", "starRating") SELECT "createdAt", "customerId", "customerName", "id", "productId", "reviewDescription", "reviewTitle", "shop", "starRating" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
