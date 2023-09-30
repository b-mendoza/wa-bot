/*
  Warnings:

  - You are about to drop the column `userId` on the `Counter` table. All the data in the column will be lost.
  - You are about to drop the column `whatsAppId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userWhatsAppId` to the `Counter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external__whatsAppId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Counter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userWhatsAppId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Counter_userWhatsAppId_fkey" FOREIGN KEY ("userWhatsAppId") REFERENCES "User" ("external__whatsAppId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Counter" ("count", "createdAt", "id", "updatedAt") SELECT "count", "createdAt", "id", "updatedAt" FROM "Counter";
DROP TABLE "Counter";
ALTER TABLE "new_Counter" RENAME TO "Counter";
CREATE UNIQUE INDEX "Counter_userWhatsAppId_key" ON "Counter"("userWhatsAppId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "external__whatsAppId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_external__whatsAppId_key" ON "User"("external__whatsAppId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
