-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReviewImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT,
    "reviewId" INTEGER NOT NULL,
    CONSTRAINT "ReviewImage_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReviewImage" ("id", "imageUrl", "reviewId") SELECT "id", "imageUrl", "reviewId" FROM "ReviewImage";
DROP TABLE "ReviewImage";
ALTER TABLE "new_ReviewImage" RENAME TO "ReviewImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
