-- CreateTable
CREATE TABLE "images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "orphanageId" INTEGER NOT NULL,
    CONSTRAINT "images_orphanageId_fkey" FOREIGN KEY ("orphanageId") REFERENCES "orphanages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
