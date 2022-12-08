-- CreateTable
CREATE TABLE "orphanages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL DEFAULT 0.00,
    "longitude" DECIMAL NOT NULL DEFAULT 0.00,
    "about" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "openOnWeekends" BOOLEAN NOT NULL DEFAULT false
);
