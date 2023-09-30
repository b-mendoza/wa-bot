-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PoopCounter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PoopCounter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PoopCounter" ("count", "createdAt", "id", "updatedAt", "userId") SELECT "count", "createdAt", "id", "updatedAt", "userId" FROM "PoopCounter";
DROP TABLE "PoopCounter";
ALTER TABLE "new_PoopCounter" RENAME TO "PoopCounter";
CREATE UNIQUE INDEX "PoopCounter_userId_key" ON "PoopCounter"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
