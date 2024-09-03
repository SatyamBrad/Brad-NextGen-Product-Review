-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReviewDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reviewId" TEXT NOT NULL,
    "attributeId" TEXT,
    "value" INTEGER,
    CONSTRAINT "ReviewDetail_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReviewDetail" ("attributeId", "id", "reviewId", "value") SELECT "attributeId", "id", "reviewId", "value" FROM "ReviewDetail";
DROP TABLE "ReviewDetail";
ALTER TABLE "new_ReviewDetail" RENAME TO "ReviewDetail";
CREATE TABLE "new_ReviewImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reviewId" TEXT NOT NULL,
    "imageUrl" TEXT,
    CONSTRAINT "ReviewImage_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReviewImage" ("id", "imageUrl", "reviewId") SELECT "id", "imageUrl", "reviewId" FROM "ReviewImage";
DROP TABLE "ReviewImage";
ALTER TABLE "new_ReviewImage" RENAME TO "ReviewImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
