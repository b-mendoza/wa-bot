/*
  Warnings:

  - You are about to drop the `PoopCounter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PoopCounter";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Counter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Counter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Counter_userId_key" ON "Counter"("userId");
