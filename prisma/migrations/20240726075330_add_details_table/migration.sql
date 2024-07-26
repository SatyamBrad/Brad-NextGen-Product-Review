-- CreateTable
CREATE TABLE "ReviewDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reviewId" INTEGER NOT NULL,
    "key" TEXT,
    "value" TEXT,
    CONSTRAINT "ReviewDetail_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
