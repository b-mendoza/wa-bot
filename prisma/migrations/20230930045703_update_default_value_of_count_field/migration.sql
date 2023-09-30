-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Counter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userWhatsAppId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Counter_userWhatsAppId_fkey" FOREIGN KEY ("userWhatsAppId") REFERENCES "User" ("external__whatsAppId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Counter" ("count", "createdAt", "id", "updatedAt", "userWhatsAppId") SELECT "count", "createdAt", "id", "updatedAt", "userWhatsAppId" FROM "Counter";
DROP TABLE "Counter";
ALTER TABLE "new_Counter" RENAME TO "Counter";
CREATE UNIQUE INDEX "Counter_userWhatsAppId_key" ON "Counter"("userWhatsAppId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
