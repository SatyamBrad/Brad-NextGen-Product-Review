/*
  Warnings:

  - You are about to alter the column `value` on the `ReviewDetail` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReviewDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reviewId" INTEGER NOT NULL,
    "key" TEXT,
    "value" INTEGER,
    CONSTRAINT "ReviewDetail_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReviewDetail" ("id", "key", "reviewId", "value") SELECT "id", "key", "reviewId", "value" FROM "ReviewDetail";
DROP TABLE "ReviewDetail";
ALTER TABLE "new_ReviewDetail" RENAME TO "ReviewDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
